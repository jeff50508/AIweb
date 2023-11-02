import pandas as pd
import yfinance as yf
from datetime import datetime
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
from fastapi.responses import JSONResponse
import io
import matplotlib
matplotlib.use('Agg')


def train_and_predict(X_train, y_train, X_test):
    # 定義線性回歸模型
    model = tf.keras.models.Sequential([
        tf.keras.layers.Input(shape=(1,)),
        tf.keras.layers.Dense(1)
    ])
    # 編譯模型
    model.compile(optimizer='sgd', loss='mse')
    # 訓練模型
    model.fit(X_train, y_train, epochs=100)
    # 測試模型
    predictions = model.predict(X_test)
    return predictions


def visualize_predictions(X_train, y_train, X_test, predictions, fs):
    buffer = io.BytesIO()
    plt.scatter(X_train, y_train, label='Training Data')
    plt.plot(X_test, predictions, color='red', label='Predictions')
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.title('result')
    plt.legend()
    # image_file_path = r'C:\Users\jeff5\Desktop\prediction_plot1.png'
    plt.savefig(buffer, format='png')
    # plt.show()
    plt.close()
    buffer.seek(0)
    image_data = buffer.read()
    objecid = fs.put(image_data, filename=datetime.now().strftime(
        "%Y-%m-%d_%H-%M-%S"))
    print(objecid)
    return objecid
    # print(image_data)
    # return image_data
    # return JSONResponse(content={"message": buffer.read()})


def main(fs):
    # 生成一些模擬的訓練數據
    np.random.seed(0)
    X_train = np.random.rand(100, 1) * 10
    y_train = 2 * X_train + 1 + np.random.randn(100, 1)
    X_test = np.array([[5.0], [7.0], [3.0], [8.0], [9.0], [1.0]])
    predictions = train_and_predict(X_train, y_train, X_test)
    return visualize_predictions(X_train, y_train, X_test, predictions, fs)


def grabstockhistory(stockId):
    stockname = yf.Ticker(stockId)
    data = stockname.history(period="1mo")
    print(data)
    hist = pd.DataFrame(data)
    hist.drop(['Open', 'High', 'Low', 'Volume', 'Dividends',
              'Stock Splits'], axis=1, inplace=True)
    hist.index = hist.index.astype(str).str[:10]
    print(hist)
    return hist
