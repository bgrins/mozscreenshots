# mozscreenshots

Take screenshots of Mozilla applications in various UI configurations.

**Note**: mozscreenshots is not intended to be run on a user's main profile as it sets preferences and changes the application configuration without the possibility to undo this. A clean temporary profile will be created via `mozrunner` by default.

# dependencies
* `mozrunner` (mozscreenshots subclasses mozrunner)
* `scrot` for Linux screenshots

# running mozscreenshots
The tool will setup the browser in every possible combination of the specified configuration sets (e.g. `WindowSize`) and take a screenshot. Note that the order of the sets affects the order that the configurations are setup. If no sets are specified, the default is: `SystemTheme Tabs WindowSize Toolbars LightweightThemes`. To output the list of valid sets, use `--list-sets`.

## Running from source:

    python runner.py -b /Applications/Nightly.app [sets]

## After installation:

    mozscreenshots -b /Applications/FirefoxUX.app [sets]

##Examples

    mozscreenshots -b /Applications/Nightly.app Tabs WindowSize LightweightThemes
    mozscreenshots -b /c/Program\ Files\ \(x86\)/UX/firefox.exe SystemTheme WindowSize Toolbars
    mozscreenshots -b ~/nightly/firefox Tabs WindowSize Toolbars LightweightThemes

# output
The screenshots can be found in the following directories for now (issue 9 will make them configurable):

* `C:\mozscreenshots\` (Windows)
* `/tmp/mozscreenshots/` (OS X and Linux)

# caveats
* The `SystemTheme` configuration attempts to change the Windows theme while the application is running which doesn't always work correctly. The alternative is to manually change the Windows theme before a run and not including the `SystemTheme` set.
* On OS X, if you have another instance of the binary running from the same path (e.g. with a different profile), the wrong application may be captured. You can use a symlink to workaround the issue.
* There is no attempt to reset the profile or system theme back to their original value after a run. The Windows theme can be re-set manually and runs shouldn't be performed on a user's default profile.
* The PrivateBrowsing module only has one configuration to do a whole run in temporary private browsing mode so you'll need separate runs (with and without the configuration set) to capture both regular and PB. You can do a run in permanent private browsing mode using the ```--app-arg``` argument. See [issue #2](https://github.com/mnoorenberghe/mozscreenshots/issues/2).
