#include<bits/stdc++.h>
using namespace std;

// Global parameters
int messageCount = 0;
string errorMessage;
vector<string> analysisMessage;

//Property details
int propertyArea;    // in sq Feet
long long int propertySellingPrice; // in INR, this is the price at which prop is being sold
int pricePerSquareFeetOfPropertyArea; // in INR/sq FT

// Buyer Parameters
//string isBuyersRented = "True";
string propertyFor="others";
long long int totalPriceOfAllPropertiesOfBuyer = 60000000; // in INR
int pricePerSquareFeetOfPropertyAreaOfCurrentProperty; // the prop where the buyer is currently staying
int propertyAreaOfCurrentProperty;
bool isLoanTaken = true;
string loanLender= "bank";
int rateOfInterest;
long long int loanTaken; // The amount approved for the loan

// Buyer Pan parameters

string topSourceOfIncome1;
string topSourceOfIncome2;
string topSourceOfIncome3;
long long int inheritedPropertyTotalCost;  // This includes gift also
long long int soldPropertyTotalCost;

// Buyers Bank details

long long int salaryYear1;
long long int salaryYear2;
long long int salaryYear3;
long long int salaryYear4;
long long int salaryYear5;

int transactionsExceedingSalaryTimes1;
int transactionsExceedingSalaryTimes2;
int transactionsExceedingSalaryTimes5;
int transactionsExceedingSalaryTimes10;
int transactionsExceedingSalaryTimes20;

int incomingTransactionsExceedingSalaryTimes1;
int incomingTransactionsExceedingSalaryTimes2;
int incomingTransactionsExceedingSalaryTimes5;
int incomingTransactionsExceedingSalaryTimes10;
int incomingTransactionsExceedingSalaryTimes20;

// Function to check if the property if for buyer himself, some family member or others
void checkBuyersIntention()
{
    if(propertyFor=="self"){
        return;
    }
    else if(propertyFor == "family"){
        return;
    }
    else{
        messageCount++;
        string message = "#Kindly enquire about who is getting the property?";
        //cout<<message<<endl;
        analysisMessage.push_back(message);
    }
}

void checkIfPropertyIsSoldAtRightPrice()
{
    long long int actualEstimatedPropValue = pricePerSquareFeetOfPropertyArea*propertyArea;
    if(100*propertySellingPrice > 115*actualEstimatedPropValue){
        string message = "#Kindly check why the property is being sold at a high price";
        analysisMessage.push_back(message);
        return;
    }
    else if(100*propertySellingPrice < 85*actualEstimatedPropValue){
        string message = "#Kindly check why the property is being sold at a low price";
        analysisMessage.push_back(message);
        return;
    }
    else{
        return; // Property is sold at correct price
    }
}
void checkValueOfTheCurrentPropertyOfBuyer()
{
    long long int estimatedPriceOfCurrentProperty = pricePerSquareFeetOfPropertyAreaOfCurrentProperty*
                                                        propertyAreaOfCurrentProperty;
    if(propertySellingPrice >= 3*estimatedPriceOfCurrentProperty){
        string message = "#Please check that the value of current prop of buyer is v.low compared to the prop he is purchasing";
        analysisMessage.push_back(message);
        return;
    }
    return;
}
void checkAbnormalOutgoingTransactions()
{
    if(transactionsExceedingSalaryTimes20 || transactionsExceedingSalaryTimes10 > 0){
        string message = "#Please check that a transaction exceeding 10 times the monthly salary of the buyer is carried out recently";
        analysisMessage.push_back(message);
        return;
    }
    if(transactionsExceedingSalaryTimes5 || transactionsExceedingSalaryTimes2 > 3){
        string message = "#Please check that more than 3 transactions exceeding 2 times the monthly salary of the buyer are carried out recently";
        analysisMessage.push_back(message);
        return;
    }
    if(transactionsExceedingSalaryTimes1 > 5){
        string message = "#Please check that more than 5 transactions exceeding the monthly salary of the buyer are carried out recently";
        analysisMessage.push_back(message);
        return;
    }
}
void checkAbnormalIncomingTransactions()
{
    if(incomingTransactionsExceedingSalaryTimes20 || incomingTransactionsExceedingSalaryTimes10 > 0){
        string message = "#Please check that an incoming transaction exceeding 10 times the monthly salary of the buyer is carried out recently";
        analysisMessage.push_back(message);
        return;
    }
    if(incomingTransactionsExceedingSalaryTimes5 || incomingTransactionsExceedingSalaryTimes2 > 3){
        string message = "#Please check that more than 3 incoming transactions exceeding 2 times the monthly salary of the buyer are carried out recently";
        analysisMessage.push_back(message);
        return;
    }
    if(incomingTransactionsExceedingSalaryTimes1 > 5){
        string message = "#Please check that more than 5 incoming transactions exceeding the monthly salary of the buyer are carried out recently";
        analysisMessage.push_back(message);
        return;
    }
}
void checkBuyerWhenLoanTaken()
{
    long long int downpayment = propertySellingPrice - loanTaken;
    if(2*downpayment >= propertySellingPrice){
        string message = "#Please check that the amount of loan taken is low compared to the property price";
        analysisMessage.push_back(message);
    }
    else{
        if(loanLender == "others"){
            string message = "#Please check the source of Loan";
            analysisMessage.push_back(message);
        }
        if(rateOfInterest > 10){
            string message = "#Please check that the rate of interest of Loan is V.High";
            analysisMessage.push_back(message);
        }
    }
}
void checkPanDetailsInNoLoanCase()
{

           long long int totalIncomingMoney = incomingTransactionsExceedingSalaryTimes1+
                incomingTransactionsExceedingSalaryTimes2 + incomingTransactionsExceedingSalaryTimes5
                + incomingTransactionsExceedingSalaryTimes10 + incomingTransactionsExceedingSalaryTimes20;
           long long int totalSavings = inheritedPropertyTotalCost + soldPropertyTotalCost + totalIncomingMoney;
           if(totalSavings>= propertySellingPrice){
                return;
           }
           else{
                long long int balanceMoney = propertySellingPrice - totalSavings;
                long long int estimatedSalarySavingsOverfiveYears = salaryYear1+
                salaryYear2 + salaryYear3 + salaryYear4 + salaryYear5;
                if(estimatedSalarySavingsOverfiveYears >= balanceMoney){
                    return;
                }
                else{
                    string message = "#Kindly check the income source. Salary is not sufficient for accumulation";
                    analysisMessage.push_back(message);
                }
           }
}
int main()
{
    cout<<"KO"<<endl;

    freopen("test1.txt","r",stdin);
    freopen("file1.txt","w",stdout);

    // Input parameters
    cin>>propertyArea;
    cin>>propertySellingPrice;
    cin>>pricePerSquareFeetOfPropertyArea;
    cin>>propertyFor;
    cin>>totalPriceOfAllPropertiesOfBuyer;
    cin>>pricePerSquareFeetOfPropertyAreaOfCurrentProperty;
    cin>>propertyAreaOfCurrentProperty;
    cin>>isLoanTaken;
    cin>>loanLender;
    cin>>rateOfInterest;
    cin>>loanTaken;
    cin>>topSourceOfIncome1;
    cin>>topSourceOfIncome2;
    cin>>topSourceOfIncome3;
    cin>>inheritedPropertyTotalCost;
    cin>>soldPropertyTotalCost;
    cin>>salaryYear1;
    cin>>salaryYear2;
    cin>>salaryYear3;
    cin>>salaryYear4;
    cin>>salaryYear5;
    cin>>transactionsExceedingSalaryTimes1;
    cin>>transactionsExceedingSalaryTimes2;
    cin>>transactionsExceedingSalaryTimes5;
    cin>>transactionsExceedingSalaryTimes10;
    cin>>transactionsExceedingSalaryTimes20;
    cin>>incomingTransactionsExceedingSalaryTimes1;
    cin>>incomingTransactionsExceedingSalaryTimes2;
    cin>>incomingTransactionsExceedingSalaryTimes5;
    cin>>incomingTransactionsExceedingSalaryTimes10;
    cin>>incomingTransactionsExceedingSalaryTimes20;

    checkBuyersIntention();
    checkIfPropertyIsSoldAtRightPrice();
    checkValueOfTheCurrentPropertyOfBuyer();
    checkAbnormalOutgoingTransactions();
    checkAbnormalIncomingTransactions();
    if(isLoanTaken == true){
        checkBuyerWhenLoanTaken();
    }
    else{
        checkPanDetailsInNoLoanCase();
    }
    if(analysisMessage.size()==0){
        cout<<"Success"<<endl;
    }
    else{
        cout<<"failure"<<endl;
        for(int i=0;i<analysisMessage.size();i++)
        {
            cout<<analysisMessage[i]<<endl;
        }
    }
    
}
