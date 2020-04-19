import re
import random
import numpy
import json

# app.py
from flask import Flask, request           # import flask
from flask_cors import CORS

app = Flask(__name__)             # create an app instance
CORS(app)

@app.route("/cardDealer",methods=["POST"])                  
def returnCardDealer():                      
    hands = request.get_json()
    return cardDealer(hands["players"],hands["round"]),200

@app.route("/handWinner",methods=["POST"])                   
def returnHandWinner():                      
    jsonPID_Trmp = request.get_json()
    return callRoundWinner(jsonPID_Trmp),200        

def cardDealer (playerID,roundNum):
    '''
    Input = ["a1","a2","a3","a4","a5"],10
    Output = JSON Output 
            {"a1": [10 random cards], "a2": [10 random cards], "a3": [10 random cards], "a4": [10 random cards], "a5": [10 random cards]}
    '''
    cardsPerPlayer ={}
    #sampling with replacement
    list = ["AC","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC",
            "AS","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS",
            "AH","2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH",
            "AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD"]
    
    randomPlayerCards = numpy.array_split(random.sample(list, k=len(playerID)*roundNum),len(playerID))
    
    for i in range(0,len(randomPlayerCards)):
        cardsPerPlayer[playerID[i]] = randomPlayerCards[i].tolist()
    
    #print(json.dumps(cardsPerPlayer))

    return json.dumps(cardsPerPlayer)  

def callRoundWinner(jsonPID_Trmp):
    '''
    Input: JSON with player IDs, trump
            {
              "trump":"S",
              "hands": [
                { "playerId": "p1", "card": "AC"},
                { "playerId": "p2", "card": "3C"},
                { "playerId": "p3", "card": "4D"},
                { "playerId": "p4", "card": "2S"},
                { "playerId": "p5", "card": "QS"}
               ]
            }
    Output: Winning player name
    '''
    jsonPID = {}
    cardsList = []
    
    for k in jsonPID_Trmp.keys():
        if k == "trump":
            trump = jsonPID_Trmp[k]
        else:
            for i in range(0,len(jsonPID_Trmp['hands'])):
                jsonPID [jsonPID_Trmp['hands'][i]['card']] = jsonPID_Trmp['hands'][i]['playerId']
    
    for i in jsonPID.keys():
        cardsList.append(i)

    cardWinner = roundWinner (cardsList,trump)

    return jsonPID[cardWinner]

def roundWinner (handSqnce = [],trump = ""):
    '''
    Finding round winner based on following conditions:
        -> Highest base card
        -> Trump on a base card
        -> Highest trump on a base card sequence
        -> No base, no trump
    '''
    # ["AC","JC","QS","KC","8H","6C"], "C"
    trumpSqnce = []
    if(trump):
        for i,v in enumerate(handSqnce):
            if trump in v:
                trumpSqnce.append(v)

        if trumpSqnce:
            return highestCard(trumpSqnce)    

    BaseCardMatches = splitCard(handSqnce[0])
    for match in BaseCardMatches:
        trump = match.group(2)
    return roundWinner(handSqnce, trump)

def highestCard (handSqnce):
    '''
    Inputs = Cards of same suit
    Output = Highest card in value
    '''
    # ["AC","JC","QC","KC","8C","6C"]
    cardSqnce = {}
    maxCard = ""
    
    for i,v in enumerate(handSqnce):
        matches = splitCard(v)
        for match in matches:
            if match.group(1) == 'J' or match.group(1) == 'Q' or match.group(1) == 'K' or match.group(1) =='A':
                cardSqnce[i] = Face2Num(match.group(1))
            else:
                cardSqnce[i] = int(match.group(1))    ## Entering value only and Typecasting value to integer as it was a string after spliting  
    
#    for k,v in cardSqnce.items():
#        print("Index: {}, Value: {}".format(k,v))
    
    maxCard = str(max(cardSqnce.values()))        ##Typecasting integer back to string for concatenation 
    if maxCard == (11 or 12 or 13 or 14):
        maxCard = Num2Face(maxCard)
       
    return(maxCard + match.group(2))

def Face2Num(card):
    if card == 'J':
        return 11
    elif card == 'Q':
        return 12
    elif card == 'K':
        return 13
    elif card == 'A':
        return 14

def Num2Face (card):
    if card == '11':
        return "J"
    elif card == '12':
        return "Q"
    elif card == '13':
        return "K"
    elif card == '14':
        return "A"
    
def splitCard(card):
    return (re.compile("([0-9a-zA-Z]+)([a-zA-Z]+)")).finditer(card)


if __name__ == "__main__":        # on running python app.py
    app.run()                     # run the flask app