!function(){"use strict";function e(e,t,n){function o(){n.get(t.absUrl()).then(function(e){window.alert(e.status),window.alert(e.data)},function(e){window.alert(e.status),window.alert(e.data)})}e.logo=t.absUrl(),e.message="Hello wolrd",e.greet=o,$('[data-toggle="tooltip"]').tooltip()}angular.module("webApp").controller("MainCtrl",function(e,t){e.start=function(){if(pureweb.getFramework().getClient().isConnected())return void window.console.log("Spurious restart");var t=location.href;e.client=pureweb.getClient(),e.framework=pureweb.getFramework(),t=pureweb.getClient().isaSessionUri(t)?location.origin+location.pathname+"/"+location.search:location.protocol+"//"+location.host+"/pureweb/app?name="+pureweb.getServiceAppName(t),e.PrimaryView=new pureweb.client.View({id:"no",viewName:"no"}),e.setDisconnectOnUnload(!0),pureweb.listen(e.client,pureweb.client.WebClient.EventType.CONNECTED_CHANGED,e.onConnectedChanged),pureweb.listen(e.framework,pureweb.client.Framework.EventType.IS_STATE_INITIALIZED,e.onIsStateInitializedChanged),pureweb.connect(t)},e.setDisconnectOnUnload=function(e){if(e){var t=function(){return pureweb.getClient().isConnected()&&pureweb.getClient().disconnect(!1),null};window.onbeforeunload=t,window.onunload=t}else window.onbeforeunload=null,window.onunload=null},e.onConnectedChanged=function(t){if(t.target.isConnected()){var n=pureweb.getClient();pureweb.listen(n,pureweb.client.WebClient.EventType.STALLED_CHANGED,e.onStalledChanged),pureweb.listen(n,pureweb.client.WebClient.EventType.SESSION_STATE_CHANGED,e.onSessionStateChanged)}},e.onStalledChanged=function(){pureweb.getClient().isStalled()?pureweb.getClient().logger.fine("Connection to the service application has stalled and may have been lost."):pureweb.getClient().logger.fine("Connection to the service application has recovered.")},e.onSessionStateChanged=function(){var t=pureweb.getClient().getSessionState();t===pureweb.client.SessionState.FAILED&&(e.lastSessionState===pureweb.client.SessionState.CONNECTING?e.generateMessage("Unable to connect to the service application."):(e.generateMessage("Connection to the service application has been lost."),e.ownerDisconnected&&e.generateMessage("The host has left, so your connection to the service application has been lost."))),e.lastSessionState=t},e.onIsStateInitializedChanged=function(t){var n=pureweb.getFramework();n.isStateInitialized()&&(pureweb.getFramework().getState().getStateManager().addChildChangedHandler("/",e.onStateChanged),e.AppState=pureweb.getFramework().getState().toString(),e.$apply())},e.onStateChanged=function(){e.AppState=pureweb.getFramework().getState().toString(),e.$apply()},e.generateShareUrl=function(){var t=pureweb.getFramework().getClient();return t.isConnected()?void(void 0===e.shareUrl||null===e.shareUrl?t.getSessionShareUrlAsync("Scientific","",18e5,"",function(t,n){null!==t&&void 0!==t?(e.shareUrl=t,e.generateMessage(t),e.$apply()):e.generateMessage("An error occurred creating the share URL: "+n.description)}):t.invalidateSessionShareUrlAsync(e.shareUrl,function(t){void 0!==t&&null!==t?e.generateMessage("An error occurred invalidating the share URL: "+t):(e.shareUrl=null,e.$apply())})):void e.generateMessage("You must be connected to the PureWeb service app in order to generate a share URL")},e.generateMessage=function(t){e.message=t,e.$apply(),$("#pureweb_message").modal("show")},$(document).ready(e.start),window.app=e}).controller("homeCtrl",e),e.$inject=["$scope","$location","$http"]}();
jQuery(function(t){"use strict";t(".scroll").click(function(e){e.preventDefault(),t("html,body").animate({scrollTop:t(this.hash).offset().top},1e3)})});