import math
def diagonalDifference(matrix):
    leftDiagonal = 0
    rightDiagonal = 0
    for i in range(0, len(matrix[0])):
        for j in range(0, len(matrix[0])):
            if(i==j):
                leftDiagonal += matrix[i][j]
                pass
            pass
        matrix[i] = matrix[i][::-1]

    for i in range(0, len(matrix[0])):
        for j in range(0, len(matrix[0])):
            if(i==j):
                rightDiagonal += matrix[i][j]
            pass
        pass

    result = math.fabs(leftDiagonal - rightDiagonal)
    print(f'|{leftDiagonal} - {rightDiagonal}| = {result}')
    return result


squareQuantity = int(input("De cuantos elementos tendra la matriz?\n?> "))
newMatrix = []
yArray = []
for i in range(0, squareQuantity):
    for j in range(0, squareQuantity):
        yArray.append(float(input(f"Dame un numero para el indice [{i}][{j}]\n?> ")))
        pass
    newMatrix.append(yArray)
    yArray = []
    pass


diagonalDifference(newMatrix)

