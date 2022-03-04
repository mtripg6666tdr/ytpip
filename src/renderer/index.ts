import { ipcRenderer, IpcRendererEvent, NewWindowEvent } from "electron"
import { ipcEvents } from "../common/definition";

window.addEventListener("load", () => {
  const webView = document.createElement("webview");
  const wrapper = document.getElementById("main_wv_wrapper");
  webView.id = "main_wv";
  webView.setAttribute("src", "./placeholder.html");
  webView.allowpopups = true;
  wrapper.appendChild(webView);

  ipcRenderer
    .on(ipcEvents.navigate, (event:IpcRendererEvent, url:string) => {
      if(!url) return;
      webView.setAttribute("src", url);
    });
});