// Type definitions for PayPal SDK
declare namespace paypal {
  interface HostedButtons {
    (options: {
      hostedButtonId: string;
    }): {
      render: (container: string) => void;
    };
  }

  interface PayPal {
    HostedButtons: HostedButtons;
  }
}

declare const paypal: paypal.PayPal;
