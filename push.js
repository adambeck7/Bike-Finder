//check to see if the browser supports push messaging
//https://developers.google.com/web/fundamentals/push-notifications/subscribing-a-user

console.log("You have reached the push.js file");

featureDetection();
registerServiceWorker();
askPermission();
subscribeUserToPush();

function featureDetection(){

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/service-Worker.js')
    .then(function(response){
        console.log('registration successful', response);
    }), 
    function(error) {
        console.log('Registration Failed', error);
    }
}

// if (!('serviceWorker' in navigator)) {
//     // Service Worker isn't supported on this browser, disable or hide UI.

//     return;
//   }
  
//   if (!('PushManager' in window)) {
//     // Push isn't supported on this browser, disable or hide UI.

//     return;
//   }

}

// Register a service worker
function registerServiceWorker() {
    return navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      console.log('Service worker successfully registered.');
      return registration;
    })
    .catch(function(err) {
      console.error('Unable to register service worker.', err);
    });
  }

  // Requesting permission to send push notification to the user.
  function askPermission() {
    return new Promise(function(resolve, reject) {
      const permissionResult = Notification.requestPermission(function(result) {
        resolve(result);
        console.log("Result", result);
      })

      .then(function(permissionResult) {
        if (permissionResult !== 'granted') {
          throw new Error('We weren\'t granted permission.');
        }
      });
      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    })
    
  }

  // once persmission has been received we can then register the user
  // by calling registration.pushManager.subscribe().
  function subscribeUserToPush() {
    return navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'AAAAkuM9Ie0:APA91bH0RBfuSw37xGgfNw0NDdz4dwhjxb2S5llgl1TfkzH5vS56LRZe4ldRwMwNr34N46wo2iZvhDZsw4GPVTyx_2FZvCVIpDsyf5nEUyh516CHIie2LNaTsAuIfQ4T2-Edtje9WEhI4SnTywjDlR82Rnq4muMEKQ'
        )
      };
  
      return registration.pushManager.subscribe(subscribeOptions);
    })
    .then(function(pushSubscription) {
      console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
      return pushSubscription;
    });
  }
  
  // create application server keys
  // https://web-push-codelab.glitch.me/
  // thsi only needs to be done once.
//   $ npm install -g web-push
//   $ web-push generate-vapid-keys

