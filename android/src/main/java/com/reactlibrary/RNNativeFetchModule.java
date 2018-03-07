
package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;

public class RNNativeFetchModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNNativeFetchModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNNativeFetch";
  }


  @ReactMethod
  public void makeRequest(String pURL, ReadableMap pRequest, Promise pPromise) {
    try {
      // DO SOMETHING
      pPromise.resolve(pRequest);
    } catch (Exception e) {
      pPromise.reject('ERROR', e);
    }
  }
}