void setup() {

  Serial.begin(9600);

  randomSeed(analogRead(0));
}

void loop() {
  String dataString = "";

  for (int i = 0; i < 6; i++) {
    dataString += random(2);
    if (i < 5) {
      dataString += ",";
    }
  }

  for (int i = 0; i < 6; i++) {
    dataString += ",f" + String(random(0x1000, 0x10000), HEX);
  }

  Serial.println(dataString);

  delay(1000);
}
