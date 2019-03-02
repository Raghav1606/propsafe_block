import numpy as np
from sklearn.metrics import make_scorer, f1_score, accuracy_score, recall_score, precision_score, classification_report, precision_recall_fscore_support
from sklearn.ensemble  import GradientBoostingClassifier, RandomForestClassifier
from sklearn.model_selection import KFold
from string import punctuation
import  sklearn
from collections import defaultdict
import sys
import numpy
import os
import io
import re
import json
import csv
import pandas
import random

LOSS_FUNCTION='categorical_crossentropy'
OPTIMIZER='adam'
EPOCHS=10
BATCH_SIZE=128
SEED=42
FOLDS=10
INITIALIZE_WEIGHTS='random'

# preprocessing

with open('jobs.txt', 'r') as f:
    x = f.readlines()

x2 = [int(x1.split('\n')[0]) for x1 in x]

shuffled_rows = []
rows = []
labels = []
X_train = []
X_test = []
Y_train = []
Y_test = []
ratio = 1
with open('dataset.csv', 'r') as myfile:
    reader = csv.reader(myfile , delimiter=',')

    #print reader

    for i in reader:
    	rows.append(i);

    rows = rows[1:]
    random.shuffle(rows);

    #print len(rows)

    for row in rows:
    	#print row
    	labels.append(row[-1])
    	shuffled_rows.append(row[1:-1]);


    X_train = shuffled_rows[:int(ratio*len(shuffled_rows))]
    #X_test = shuffled_rows[int(ratio*len(shuffled_rows)):]

    X_train = np.asarray(X_train)
    #X_test = np.asarray(X_test)

    Y_train = labels[:int(ratio*len(shuffled_rows))]
    #Y_test = labels[int(ratio*len(shuffled_rows)):]

    Y_train = np.asarray(Y_train)
    #Y_test = np.asarray(Y_test)

    #print X_test.shape
    X_test = np.asarray(x2)
    X_test = X_test.reshape(1,-1)


# Model

rf = RandomForestClassifier(max_depth = 20, criterion = 'entropy', oob_score=True)
rf.fit(X_train,Y_train)
#print 100*rf.score(X_train, Y_train)
#print 100*rf.score(X_test,Y_test)
op = rf.predict(X_test)[0]

with open("output.txt", "w") as f:
	f.write(op)
