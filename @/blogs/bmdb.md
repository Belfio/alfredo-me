# Biomeddb.com

## Where biomedical engineers gather around to tackle a common problem

<br>
<br>
Couldn't find anything similar so I started the development. The scaffolding is done, but the crucial bit is missing. Let me explain the UX:
- a user gets in and they're either interested in a particular problem, or they are exploring problems. i.e. skin cancer melanoma recognition.
- the first step is to understand the state of science in this field: how well do algorithms perform at the moment? The quality of the algorithms is based on the quality of training data and the model's ability to accurately label a cancer as cancer and a non-cancer as non-cancer.
- if the SOTA is not satisfactory, the user can go and explore the datasets and understand if they are comprehensive enough.
- if the SOTA is not satisfactory, the user can go and explore the models and understand if they are comprehensive enough.
- the user has now a specific problem to solve - data problem or model problem?
- if it is a data problem they should find new data
- if it is a model problem they should find new models
- when data or the model gets submitted, it will be ranked!
<br>
<br>
## Ranking

This is the tricky part.

### Data ranking

tbd

### Model ranking

I'm building a docker image that can take a jupyter notebook .ipynb and the selected datasets adn then print in a database the result of the model classification.
Fun!
2024-10-13
