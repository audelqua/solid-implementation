// task description => check out section of a shop 
// two ways of payment:
// 1. cash 
// 2. online myFatoorah
// 3. online keyNet 

interface IPaymentTypes { 
    [key: string]: string;
}

const paymentMethodsOptions: IPaymentTypes = {
    CASH: 'CASH', // payment will success immediately 
    MY_FATOORAH: 'MY_FATOORAH', // we have to check the response from there and send the result via SMS to user. 
    KEYNET: 'KEYNET', // we have to check the response from there and send the result via SMS to user also we have to email that. 
}

// ************ bad practice ***************
class Checkout {
    chosenPaymentMethod: string;

    constructor(chosenPaymentMethod: string) {
        this.chosenPaymentMethod = chosenPaymentMethod
    }

    checkout(): boolean {
        let isSuccessful: boolean = false

        switch(this.chosenPaymentMethod) {
            case paymentMethodsOptions['CASH']:
                isSuccessful = true
                break;
            case paymentMethodsOptions['MY_FATOORAH']:
                this.openMyFatoorah()
                isSuccessful = true
                break;
            case paymentMethodsOptions['KEYNET']:
                this.openKeyNet()
                isSuccessful = true
                break;
            default: 
                isSuccessful = false
                break;
        }
        
        if(this.chosenPaymentMethod === paymentMethodsOptions['KEYNET']) {
            this.notifyUserBySMS(isSuccessful)
            this.notifyUserByEmail(isSuccessful)
        }
        if(this.chosenPaymentMethod === paymentMethodsOptions['MY_FATOORAH']) {
            this.notifyUserBySMS(isSuccessful)
        }

        return isSuccessful
    }

    private notifyUserBySMS(isSuccess: boolean) {
        // 1. send req to the SMS provider
        // 2. process the result
        // 1. try again if failed!
        if(isSuccess) console.log('SMS has been sent!');
    }
    private notifyUserByEmail(isSuccess: boolean) {
        // 1. send req to the Email provider
        // 2. process the result
        // 1. try again if failed!
        if(isSuccess) console.log('Email has been sent!');
    }
    private openMyFatoorah(): boolean {
        console.log('MyFatoorah gateway opened!');
        console.log('MyFatoorah gateway done!');
        return true // means that payment successful
    }
    private openKeyNet(): boolean {
        console.log('KeyNet gateway opened!');
        console.log('KeyNet gateway done!');
        return true // means that payment successful
    }
} 


const checkoutInstance = new Checkout('MY_FATOORAH')
checkoutInstance.checkout()

// ******* This is a bad implementation ***
// If we need to add another payment gateway like stripe. we have to change the class and makes it dirtier.
// If we need  to add another process provider like sending notification to users, we also have to change the class and makes it dirtier.


