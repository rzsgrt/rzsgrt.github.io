---
title: Counterfactual Machine Learning
date: March 30, 2025
---

I'll begin by discussing counterfactuals example. Suppose we have a machine learning model that predicts the likelihood of a patient developing diabetes, with one of its features is the patient's glucose level. In this scenario, the model predicts that a patient has a high likelihood of developing diabetes, based on their glucose level. Now we may wonder what glucose level would be required for the prediction to change to not indicate diabetes. To answer this question, we can run a counterfactual analysis using the machine learning model, where we simulate changing the patient's glucose level and observe how this affects the prediction.
So, with this example, we can see that counterfactual can be used for *interpreting* (its not *casual relationship*) model prediction for specific instance.

When generating counterfactual example, we want feature changes to be minimal and the new value is actionable. To formalize that requirement, we can refer to loss function proposed by Wachter et al[1]

$$
L(x', x) = \lambda \cdot (f(x') - y')^2 + d(x, x')
$$

where:

- $x$ is the original input.
- $x'$ is the counterfactual.
- $f(x')$ is the model's prediction on the counterfactual.
- $y'$ is the desired output.
- $d(x, x')$ is a distance function.
- $\lambda$ is a regularization parameter that controls the trade-off between achieving the desired prediction and staying close to the original instance.

For distance function above:  
$$
d(x, x') = \sum_{i} \frac{|x_i - x'_i|}{\text{MAD}_i}
$$

where:

$$
\text{MAD}_i = \text{median}(|x_i - \text{median}(x_i)|)
$$
This normalization ensures scale invariance across features.

Along with Watcher, I found another paper proposing loss function more robust since they include diversity in generated example. Mothilal[2] add new component in loss function:

$$
L(x') = L_{\text{pred}} + \lambda_1 L_{\text{prox}} + \lambda_2 L_{\text{div}}
$$

The first and second component similar with we see in Watcher. The last component encourages diversity among the generated counterfactuals which results different feature combinations being altered. Using this approach, we can get multiple alternative paths to achieve the desired outcome.

Luckily, both Wachter version or Mothilal version are available in python. The first is implemented in mlextend while the second has official implementation on github.

---

***(Disclaimer: I use an LLM while write this post to ensure my writing is grammatically correct and easy to understand. All generated content is reviewed to prevent any changes in meaning. However, any incorrect information in this post may result from my own misunderstandings. If you notice any inaccuracies, please let me know.)***

---
Source:

[1] Wachter, S., Mittelstadt, B., & Russell, C. (2017). Counterfactual explanations without opening the black box: Automated decisions and the GDPR. [link](https://arxiv.org/abs/1711.00399)  
[2] Mothilal, Ramaravind K., Amit Sharma, and Chenhao Tan. (2019). Explaining Machine Learning Classifiers through Diverse Counterfactual Explanations. [link](https://arxiv.org/pdf/1905.07697)  
[3] Interpreting models via counterfactuals (Code) [link](https://rasbt.github.io/mlxtend/user_guide/evaluate/create_counterfactual/)  
[4] Diverse Counterfactual Explanations (DiCE) for ML (Code) [link](https://github.com/interpretml/DiCE)  
[5] Counterfactual Explanations [link](https://christophm.github.io/interpretable-ml-book/counterfactual.html)
