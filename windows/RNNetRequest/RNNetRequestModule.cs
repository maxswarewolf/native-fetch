using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Net.Request.RNNetRequest
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNNetRequestModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNNetRequestModule"/>.
        /// </summary>
        internal RNNetRequestModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNNetRequest";
            }
        }
    }
}
