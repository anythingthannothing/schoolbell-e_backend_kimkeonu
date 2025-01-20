// 해당 함수의 리턴 타입은 두 수의 쌍이므로 tuple type 사용
const getMaximizingProductPair = (): [number, number] => {
  // 문제의 제약조건 => 1, 3, 5, 7, 9를 각각 한 번씩만 사용
  const nums = [1, 3, 5, 7, 9];

  let result: [number, number] = [0, 0];
  let max = 0;

  // 큰 자릿수에 큰 수를 넣기 위해 내림차순 정렬 진행
  nums.sort((a, b) => b - a);

  // 두 수의 순서가 곱셈의 결과값에 영향을 미치지 않으므로 조합으로 쌍 선정
  // 5개의 수 중 1개, 2개의 수 선정으로 전체 결과 검증 가능
  for (let k = 1; k <= 2; k++) {
    const combinations = getCombinations(nums, k);

    for (const combi of combinations) {
      // 조합으로 선정한 수의 배열을 기반으로 첫 번째 수 산출
      let num1: number = combi.reduce((acc, val) => acc * 10 + val, 0);

      // 조합에 포함되지 않은 수를 기반으로 두 번째 수 산출
      const combiSet = new Set(combi);
      const remainingNumbers = nums.filter((n) => !combiSet.has(n));
      let num2: number = remainingNumbers.reduce(
        (acc, val) => acc * 10 + val,
        0,
      );

      const product = num1 * num2;

      if (product > max) {
        max = product;
        result = [num1, num2];
      }
    }
  }

  return result;
};

function getCombinations(nums: number[], k: number): number[][] {
  const results: number[][] = [];

  // 백트래킹을 사용하여 조합 생성
  function backtrack(start: number, combo: number[]) {
    // Base Case: 조합의 길이가 k일 경우 종료
    if (combo.length === k) {
      results.push([...combo]);
      return;
    }

    // start 인덱스부터 배열을 순회하며 조합을 생성
    for (let i = start; i < nums.length; i++) {
      combo.push(nums[i]);
      backtrack(i + 1, combo);
      combo.pop();
    }
  }

  backtrack(0, []);
  return results;
}

console.log(getMaximizingProductPair());
