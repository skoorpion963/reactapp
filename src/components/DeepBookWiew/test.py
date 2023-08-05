import websocket

def on_message(ws, message):
    print("Received message:", message)

def on_error(ws, error):
    print("WebSocket error:", error)

def on_close(ws, close_status_code, close_msg):
    print("WebSocket connection is closed:", close_status_code, close_msg)

def on_open(ws):
    print("WebSocket connection is open.")
    # Когда соединение установлено, вы можете отправить запросы на сервер
    # Например, чтобы подписаться на определенные данные, используйте ws.send()
    # Например:
    # ws.send('{"method": "SUBSCRIBE", "params": ["btcusdt@aggTrade"], "id": 1}')

if __name__ == "__main__":
    symbol = "BTCUSDT"
    server_address = f"wss://stream.binance.com:9443/ws/{symbol.lower()}@aggTrade"
    ws = websocket.WebSocketApp(server_address,
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
    ws.on_open = on_open

    ws.run_forever()
