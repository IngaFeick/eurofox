{
  description = "Firefox plugin to convert imperial to metric units";

  inputs.napalm.url = "github:nix-community/napalm";
  inputs.vuizvui.url = "github:openlab-aux/vuizvui";

  outputs = { self, nixpkgs, napalm, vuizvui }: let
    inherit (nixpkgs) lib;

    supportedSystems = [
      "aarch64-darwin" "x86_64-darwin"
      "aarch64-linux" "i686-linux" "x86_64-linux"
    ];
    isLinux = lib.flip lib.elem lib.systems.doubles.linux;
    linuxSystems = lib.filter isLinux supportedSystems;

    pkgsWithSystem = system: import nixpkgs {
      inherit system;
      overlays = [ napalm.overlay vuizvui.overlay ];
    };
  in {
    packages = lib.genAttrs supportedSystems (system: let
      pkgs = pkgsWithSystem system;
    in {
      default = self.packages.${system}.eurofox;
      eurofox = pkgs.napalm.buildPackage self {
        doCheck = true;
        checkPhase = "npm test";
      };
    });

    apps = lib.genAttrs linuxSystems (system: let
      pkgs = pkgsWithSystem system;

      eurofoxDeps = pkgs.napalm.buildPackage self {
        installPhase = "mkdir -p \"$out\" && cp -r node_modules \"$out\"";
      };

      webExtConfig = {
        sourceDir = "/source/src";
        run.target = [ "firefox-desktop" "chromium" ];
        run.startUrl = [ "http://localhost/demo/test.html" ];
        run.firefox = "${pkgs.firefox-unwrapped}/bin/firefox";
        run.chromiumBinary = "${pkgs.chromium}/bin/chromium";
      };

      webExtConfigFile = pkgs.writeText "webext-config.js" ''
        module.exports = ${builtins.toJSON webExtConfig};
      '';

      firefoxWithPlugin = pkgs.writeScriptBin "firefox-with-eurofox" ''
        #!${pkgs.runtimeShell} -e
        ${pkgs.ip2unix}/bin/ip2unix -r port=9999,path=webserver.sock \
          ${pkgs.python3.interpreter} -m http.server -d /source 9999 &
        trap 'kill -INT %%' EXIT
        PATH= ${pkgs.ip2unix}/bin/ip2unix \
          -r out,addr=127.0.0.1,port=80,path=webserver.sock \
          ${pkgs.nodejs}/bin/node \
          ${eurofoxDeps}/node_modules/web-ext/bin/web-ext.js run \
            --config ${webExtConfigFile} "$@"
      '';

      sandbox = pkgs.vuizvui.buildSandbox firefoxWithPlugin {};
    in {
      default = {
        type = "app";
        program = "${pkgs.writeScript "firefox-with-eurofox" ''
          #!${pkgs.runtimeShell} -e
          export NIX_SANDBOX_DEBUG_INJECT_DIRS="$PWD=/source"
          exec ${sandbox}/bin/firefox-with-eurofox "$@"
        ''}";
      };
    });
  };
}
