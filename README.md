# Decentralisation_Technologies_TD3

## STEP 4 : Slashing Mechanism

Let's explain proof-of-stake consensus mechanism with a slashing protocol in the context of your Flask application with different models (linear_regressor, decision_tree, random_forest, xgboost).

1. Each of our models is like a participant in a prediction game. To join, they each need to make an initial deposit (1000 credits) into their account. This is their commitment to making good predictions.

2. We need a record book to keep track of each model's account balance and its influence based on the weight we assigned them in step 3. It can look like this :
{
  "linear_regressor": {"balance": 1000, "weight": 0.25},
  "decision_tree": {"balance": 1000, "weight": 0.25},
  "random_forest": {"balance": 1000, "weight": 0.25},
  "xgboost": {"balance": 1000, "weight": 0.25}
}

3. Now we can generate random data to predict (with a result that is known). Then each models make its own prediction. These predictions are used to make a consensus :
For instance, if the linear regressor predicts 3.0, the decision tree predicts 2.5, the random forest predicts 3.2, and xgboost predicts 2.8, the consensus prediction would be the average of these values: (3.0 + 2.5 + 3.2 + 2.8) / 4 = 2.875.

4. After each round of predictions, we will see which models are more accurate. Models that make better predictions get a higher 'weight', meaning they have more influence in future predictions. We ajust the weights based on this.

Now the Slashing protocol :

5. If a model consistently makes poor predictions, it gets penalized. This means some of its deposit (balance) is taken away. For example, if a model is often very wrong, it loses 50 credits from its balance. After each round of predictions and any necessary penalties, we update the JSON file to reflect the new balances and weights of each model. This keeps our record book accurate. 
For instance, a 'poor prediction' could be in our case how far off a model's prediction is from the actual value or the consensus prediction. If a model's prediction accuracy falls below the defined threshold consistently, apply the 50 credits penalty.Then we can implement a function to write the updated information back to the JSON file to update the balance.

6. Models that have been penalized can work towards regaining their original weight and deposit, ensuring that they are motivated to adjust and improve. This method encourages  accurate predictions to maintain or increase the balance and influence of each models. Making poor predictions can lead to losing money and influence.
