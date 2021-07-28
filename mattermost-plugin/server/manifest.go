// This file is automatically generated. Do not modify it manually.

package main

import (
	"strings"

	"github.com/mattermost/mattermost-server/v5/model"
)

var manifest *model.Manifest

const manifestStr = `
{
  "id": "focalboard",
  "name": "Focalboard",
  "description": "This provides focalboard integration with mattermost.",
  "homepage_url": "https://github.com/mattermost/mattermost-plugin-focalboard",
  "support_url": "https://github.com/mattermost/mattermost-plugin-focalboard/issues",
  "release_notes_url": "https://github.com/mattermost/mattermost-plugin-focalboard/releases/tag/v0.1.0",
  "icon_path": "assets/starter-template-icon.svg",
  "version": "0.7.0",
  "min_server_version": "5.36.0",
  "server": {
    "executables": {
      "linux-amd64": "server/dist/plugin-linux-amd64",
      "darwin-amd64": "server/dist/plugin-darwin-amd64",
      "windows-amd64": "server/dist/plugin-windows-amd64.exe"
    },
    "executable": ""
  },
  "webapp": {
    "bundle_path": "webapp/dist/main.js"
  },
  "settings_schema": {
    "header": "For additional setup steps, please [see here](https://focalboard.com/fwlink/plugin-setup.html)",
    "footer": "",
    "settings": []
  }
}
`

func init() {
	manifest = model.ManifestFromJson(strings.NewReader(manifestStr))
}
