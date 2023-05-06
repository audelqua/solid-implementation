interface IPaymentGateway {
    checkout(): boolean;
}

class MyFatoorahGateway implements IPaymentGateway {
    checkout(): boolean {
        console.log('MyFatoorah gateway opened!');
        console.log('MyFatoorah gateway done!');
        return true; // payment successful
    }
}

class KeyNetGateway implements IPaymentGateway {
    checkout(): boolean {
        console.log('KeyNet gateway opened!');
        console.log('KeyNet gateway done!');
        return true; // payment successful
    }
}

interface INotificationProvider {
    sendNotification(isSuccess: boolean): void;
}

class SMSProvider implements INotificationProvider {
    sendNotification(isSuccess: boolean): void {
        if (isSuccess) console.log('SMS has been sent!');
    }
}

class EmailProvider implements INotificationProvider {
    sendNotification(isSuccess: boolean): void {
        if (isSuccess) console.log('Email has been sent!');
    }
}

class Checkout {
    private paymentGateway: IPaymentGateway;
    private notificationProviders: INotificationProvider[];

    constructor(paymentGateway: IPaymentGateway, notificationProviders: INotificationProvider[]) {
        this.paymentGateway = paymentGateway;
        this.notificationProviders = notificationProviders;
    }

    checkout(): boolean {
        let isSuccessful: boolean = this.paymentGateway.checkout();

        this.notificationProviders.forEach(provider => {
            provider.sendNotification(isSuccessful);
        });

        return isSuccessful;
    }
}

const myFatoorahGateway = new MyFatoorahGateway();
const keyNetGateway = new KeyNetGateway();
const smsProvider = new SMSProvider();
const emailProvider = new EmailProvider();

const checkoutInstance = new Checkout(myFatoorahGateway, [smsProvider]);
checkoutInstance.checkout();

const checkoutInstance2 = new Checkout(keyNetGateway, [smsProvider, emailProvider]);
checkoutInstance2.checkout();