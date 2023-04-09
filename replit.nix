{ pkgs }: {
	deps = [
		pkgs.python39Full
                pkgs.nodejs-18_x
                pkgs.nodePackages.typescript-language-server
                pkgs.yarn
                pkgs.replitPackages.jest
                pkgs.libuuid
	];
	env = { LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [pkgs.libuuid];  };
}