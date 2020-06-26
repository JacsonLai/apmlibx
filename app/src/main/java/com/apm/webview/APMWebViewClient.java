package com.apm.webview;

import androidx.annotation.Nullable;
import android.util.Log;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.InputStream;

/**
 * Created by Hyman on 2016/6/26.
 */
public class APMWebViewClient extends WebViewClient {

    public void onPageFinished(WebView view, String url) {
        super.onPageFinished(view, url);

        //String injectJs = "http://i-test.com.cn/junchao/webview/collector.js";
        String injectJs = "https://39.105.167.50/assets/www/collector.js";

        String msg = "javascript:" +
                "   (function() { " +
                "       var script=document.createElement('script');  " +
                "       script.setAttribute('type','text/javascript');  " +
                "       script.setAttribute('src', '" + injectJs + "'); " +
                "       document.head.appendChild(script); " +
                "       script.onload = function() {" +
                "           startWebViewMonitor();" +
                "           pmcAddEvent();" +
                "       }; " +
                "    }" +
                "    )();";

        view.loadUrl(msg);
    }

    @Nullable
    @Override
    public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
        WebResourceResponse response = null;
        try{
            String url = request.getUrl().toString();
            if(url.contains("assets/www")){
                String filepath;
                if(url.contains("?")){
                    filepath = url.substring(url.indexOf("assets"),url.indexOf("?"));
                }else {
                    filepath = url.substring(url.indexOf("assets"));
                }
                Log.d("shouldInterceptRequest", "拦截url: " + url);
                InputStream is = view.getContext().getAssets().open("www/collector.js");
                Log.d("file", "shouldInterceptRequest: " );
                if(filepath.endsWith(".js")){
                    response = new WebResourceResponse("text/javascript","UTF-8",is);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            Log.d("shouldInterceptRequest", "shouldInterceptRequest: 无此文件");
        }
        return response;
    }
}
