// ==UserScript==
// @author         vita10gy - K3rnelP4nik
// @name           IITC plugin: K3P4 Highlight Portals by Level Color
// @category       Highlighter
// @version        0.2.0.1
// @description    Use the portal fill color to denote the portal level by using the game level colors.
// 				   With this version the neutral portals are higlighted in white; the cose is based on
//                 vita10gy plugin "Highlight Portals by Level Color 0.2.0"
// @id             k3p4-highlight-level-color
// @namespace      https://github.com/IITC-CE/ingress-intel-total-conversion
// @updateURL      https://iitc.app/build/release/plugins/highlight-level-color.meta.js
// @downloadURL    https://iitc.app/build/release/plugins/highlight-level-color.user.js
// @match          https://intel.ingress.com/*
// @match          https://intel-x.ingress.com/*
// @grant          none
// ==/UserScript==
function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};
//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
plugin_info.buildName = 'release';
plugin_info.dateTimeVersion = '2022-12-15-143310';
plugin_info.pluginId = 'highlight-level-color';
//END PLUGIN AUTHORS NOTE

/* exported setup --eslint */

window.COLORS_LVL = ['#FFFFFF', '#FECE5A', '#FFA630', '#FF7315', '#E40000', '#FD2992', '#EB26CD', '#C124E0', '#9627F4'];

function highlightLevelColor (data) {
  var portal_level = data.portal.options.data.level;

  if (portal_level !== undefined) {
    var opacity = 0.75;
    data.portal.setStyle({fillColor: COLORS_LVL[portal_level], fillOpacity: opacity});
	
	if (data.portal.options.data.team == 'N') {
    var opacity = 0.75;
    data.portal.setStyle({fillColor: '#FFFFFF', fillOpacity: opacity});
	}
  }
  
}
function setup () {
  window.addPortalHighlighter('Level Color', highlightLevelColor);
}
setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);