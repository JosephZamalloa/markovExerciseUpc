function changeMatrixOrder() {
  const order = parseInt(document.getElementById('matrix-order').value);
  const matrixAContainer = document.getElementById('matrixA');
  const matrixBContainer = document.getElementById('matrixB');

  matrixAContainer.style.gridTemplateColumns = `repeat(${order}, 1fr)`;
  matrixAContainer.innerHTML = '';
  matrixBContainer.innerHTML = '';

  //matriz A
  for (let i = 0; i < order; i++) {
    for (let j = 0; j < order; j++) {
      const input = document.createElement('input');
      input.type = 'number';
      input.required = true;
      input.id = `${String.fromCharCode(97 + i)}-${String.fromCharCode(97 + j)}`;
      input.min = '0.01';
      input.step = '0.01';
      matrixAContainer.appendChild(input);
    }
  }

  //vector B
  for (let i = 0; i < order; i++) {
    const input = document.createElement('input');
    input.type = 'number';
    input.required = true;
    input.id = String.fromCharCode(97 + i);
    matrixBContainer.appendChild(input);
  }
}
function calculateMatrix() {
  const order = parseInt(document.getElementById('matrix-order').value);
  const matrixAIds = [];
  const matrixBIds = [];

  for (let i = 0; i < order; i++) {
    const rowIds = [];
    for (let j = 0; j < order; j++) {
      rowIds.push(`${String.fromCharCode(97 + i)}-${String.fromCharCode(97 + j)}`);
    }
    matrixAIds.push(rowIds);
    matrixBIds.push(String.fromCharCode(97 + i));
  }

  const matrixA = [];
  const matrixB = [];
  const simulationYears = parseInt(document.getElementById('years').value);

  // leer la matriz A
  for (let i = 0; i < order; i++) {
    const row = [];
    for (let j = 0; j < order; j++) {
      const value = parseFloat(document.getElementById(matrixAIds[i][j]).value);
      if (isNaN(value)) {
        alert(`Por favor ingresa un número válido en el campo ${matrixAIds[i][j]}.`);
        return;
      }
      row.push(value);
    }
    matrixA.push(row);
  }

  // leer el vector B
  for (let i = 0; i < order; i++) {
    const value = parseFloat(document.getElementById(matrixBIds[i]).value);
    if (isNaN(value)) {
      alert(`Por favor inserta un número válido para el vector`);
      return;
    }
    matrixB.push(value);
  }

  const result = [];

  for (let year = 0; year < simulationYears; year++) {
    const tempResult = [];
    if (result.length == 0) {
      for (let i = 0; i < order; i++) {
        let value = 0;
        for (let j = 0; j < order; j++) {
          const tempValue = matrixA[i][j] * matrixB[j];
          value += tempValue;
        }
        tempResult.push(value);
      }
    } else {
      for (let i = 0; i < order; i++) {
        let value = 0;
        for (let j = 0; j < order; j++) {
          const tempValue = matrixA[i][j] * result[result.length - 1][j];
          value += tempValue;
        }
        tempResult.push(value);
      }
    }
    result.push(tempResult);
  }

  const showResults = result.map((res, index) => `
    <div class="resultContainer">
      <h2>Año ${index + 1}</h2>
      ${res.map(val => `<div>${val}</div>`).join('')}
    </div>`
  );
  document.getElementById("results").innerHTML = showResults.join('');
}
