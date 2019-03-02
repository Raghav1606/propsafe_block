from keras.preprocessing.sequence import pad_sequences
from keras.layers import Embedding, Input, LSTM
from keras.models import Sequential, Model
from keras.layers import SimpleRNN, Activation, Dense, Dropout, Embedding, Flatten, Input, Convolution1D, MaxPooling1D, GlobalMaxPooling1D, Conv1D, Concatenate
import numpy as np
from sklearn.metrics import make_scorer, f1_score, accuracy_score, recall_score, precision_score, classification_report, precision_recall_fscore_support
from sklearn.ensemble  import GradientBoostingClassifier, RandomForestClassifier
from sklearn.model_selection import KFold
from keras.utils import np_utils
from string import punctuation
import codecs
import operator
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

shuffled_rows = []
rows = []
labels = []
X_train = []
X_test = []
Y_train = []
Y_test = []
ratio = 0.75
with open('/home/raghav/Documents/PropSafe/PropSafe/Dataset/dataset.csv', 'r') as myfile:
    reader = csv.reader(myfile , delimiter=',')

    #print reader

    for i in reader:
    	rows.append(i);

    rows = rows[1:]
    random.shuffle(rows);

    print len(rows)

    for row in rows:
    	#print row
    	labels.append(row[-1])
    	shuffled_rows.append(row[1:-1]);


    X_train = shuffled_rows[:int(ratio*len(shuffled_rows))]
    X_test = shuffled_rows[int(ratio*len(shuffled_rows)):]

    X_train = np.asarray(X_train)
    X_test = np.asarray(X_test)

    Y_train = labels[:int(ratio*len(shuffled_rows))]
    Y_test = labels[int(ratio*len(shuffled_rows)):]

    Y_train = np.asarray(Y_train)
    Y_test = np.asarray(Y_test)

    print X_test.shape


# Model

rf = RandomForestClassifier(max_depth = 20, criterion = 'entropy', oob_score=True)
rf.fit(X_train,Y_train)
print 100*rf.score(X_train, Y_train) 
print 100*rf.score(X_test,Y_test)
print zip(Y_test, rf.predict_proba(X_test))



########################## CNN ########################################################################


X_train = X_train.reshape(-1, 43,1)
X_test = X_test.reshape(-1, 43,1)

model=Sequential()

model.add(Convolution1D(15, 2 ,padding='same', input_shape=(43,1)))
model.add(Dropout(0.5))
model.add(Flatten())
model.add(Dense(10, activation='relu'))
model.add(Dense(3, activation='softmax',name='last'))
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
model.summary()
Y_train = np_utils.to_categorical(Y_train, num_classes=3)
Y_test = np_utils.to_categorical(Y_test, num_classes=3)

model.fit(X_train,Y_train,epochs=25,batch_size=10)
#model.save('my_model')

scores=model.evaluate(X_test,Y_test)

y_pred=model.predict(X_test)
y_pred=y_pred.argmax(axis=-1)
Y_test=Y_test.argmax(axis=-1)

print zip(y_pred, Y_test)

print(scores[1]*100)
# print(f1_score(Y_test, y_pred, average='weighted'))
# print(precision_score(Y_test, y_pred, average='weighted'))
# print(recall_score(Y_test, y_pred, average='weighted'))
