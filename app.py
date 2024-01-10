import tensorflow as tf
import matplotlib.pyplot as plt

#Get data and split into training and test datasets
(train_images, train_labels), (test_images, test_labels) = tf.keras.datasets.mnist.load_data()

#Scale value of pixels from 0-255 to 0-1
train_images = train_images / 255.0
test_images = test_images / 255.0

#visualize the data
print(train_images.shape)
print(test_images.shape)
print(train_labels)

#Display first image
plt.imshow(train_images[0], cmap='gray')
plt.show()

#define the neural network model
my_model = tf.keras.models.Sequential()
my_model.add(tf.keras.layers.Flatten(input_shape=(28,28)))
my_model.add(tf.keras.layers.Dense(128, activation='relu'))
my_model.add(tf.keras.layers.Dense(10, activation='softmax'))

#compile the model
my_model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

#train the model 
my_model.fit(train_images, train_labels, epochs=3)

#check model accuracy on test data
val_loss, val_acc = my_model.evaluate(test_images, test_labels)
print('Test accuracy: ', val_acc)

#save the model
my_model.save('my_mnist_model')

#load model from file system
my_new_model = tf.keras.models.load_model('my_mnist_model')

#check new model for accuracy on test data
new_val_loss, new_val_acc = my_new_model.evaluate(test_images, test_labels)
print('New Test accuracy: ', new_val_acc)