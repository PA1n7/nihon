x = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん"
x = "aiueokakikukekosashisusesotachitsutetonaninunenohahifuhehomamimumemoyayuyorarirurerowawon"

y = []
temp = ""

for i in range(len(x)):
    temp = temp + x[i]
    if x[i] in ["a", "e", "i", "o", "u"]:
        y.append(temp)
        temp = ""
    else:
        if x[i] == "n" and i == len(x)-1:
            y.append(temp)
            temp = ""

print(y)