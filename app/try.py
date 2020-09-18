import pandas as pd
import matplotlib.pyplot as plt
import time
while True:
    df = pd.read_excel('1.xlsx')
    df.plot(x='time')
    plt.show(block=False)
    plt.pause(120)
    plt.close()
