/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

this.EXPORTED_SYMBOLS = [ "LightweightThemes" ];

const {classes: Cc, interfaces: Ci, utils: Cu} = Components;

Cu.import("resource://gre/modules/LightweightThemeManager.jsm");
Cu.import("resource://gre/modules/Promise.jsm");
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/Timer.jsm");

this.LightweightThemes = {
  init: function(libDir) {},

  configurations: {
    noLWT: {
      applyConfig: (deferred) => {
        LightweightThemeManager.currentTheme = null;
        deferred.resolve("noLWT");
      },
    },

    darkLWT: {
      applyConfig: (deferred) => {
        LightweightThemeManager.currentTheme = {
          id:          "black",
          name:        "black",
          headerURL:   "https://addons.mozilla.org/_files/15433/BlackH.jpg?1236722683",
          footerURL:   "https://addons.mozilla.org/_files/15433/BlackF.jpg?1236722683",
          textcolor:   "#ffffff",
          accentcolor: "#000000",
        };

        // Wait for LWT listener
        setTimeout(() => {
          deferred.resolve("darkLWT");
        }, 500);
      },

      verifyConfig: verifyConfigHelper,
    },
/*
    darkColourfulLWT: {
      applyConfig: (deferred) => {
        LightweightThemeManager.currentTheme = {
          "id":"266981",
          "name":"Diagonal Lines in the Color of a Rainbow",
          "headerURL":"https://addons.cdn.mozilla.net/_files/266981/RainbowPersona.png?1293358862",
          "footerURL":"https://addons.cdn.mozilla.net/_files/266981/Rainbowpersonafooter.png?1293358862",
          "textcolor":"#faf7f7",
          "accentcolor":"#f2f7f7",
          "iconURL":"https://addons.cdn.mozilla.net/_files/266981/preview_small.jpg?1293358862",
          "previewURL":"https://addons.cdn.mozilla.net/_files/266981/preview.jpg?1293358862",
          "author":"Adam",
          "description":"I made this persona myself on Microsoft Paint. \nI like colorful things.",
        };

        // Wait for LWT listener
        setTimeout(() => {
          deferred.resolve("darkColourfulLWT");
        }, 500);
      },

      verifyConfig: verifyConfigHelper,
    },

    lightLWT: {
      applyConfig: (deferred) => {
        LightweightThemeManager.currentTheme = {
          id:          "white",
          name:        "white",
          headerURL:   "https://addons.mozilla.org/_files/308262/white-header.png?1303118483",
          footerURL:   "https://addons.mozilla.org/_files/308262/white-footer.png?1303118483",
          textcolor:   "#000000",
          accentcolor: "#ffffff",
        };
        // Wait for LWT listener
        setTimeout(() => {
          deferred.resolve("lightLWT");
        }, 500);
      },

      verifyConfig: verifyConfigHelper,
    },

*/
  },
};


function verifyConfigHelper(deferred) {
  let browserWindow = Services.wm.getMostRecentWindow("navigator:browser");
  if (browserWindow.document.documentElement.hasAttribute("lwtheme")) {
    deferred.resolve("verifyConfigHelper");
  } else {
    deferred.reject("The @lwtheme attribute wasn't present so themes may not be available");
  }
}
