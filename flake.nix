{
  description = "Firefox plugin to convert imperial to metric units";

  inputs.napalm.url = "github:nix-community/napalm";

  outputs = { self, nixpkgs, napalm }: let
    inherit (nixpkgs) lib;

    supportedSystems = [
      "aarch64-darwin" "x86_64-darwin"
      "aarch64-linux" "i686-linux" "x86_64-linux"
    ];

    pkgsWithSystem = system: import nixpkgs {
      inherit system;
      overlays = [ napalm.overlay ];
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
  };
}
