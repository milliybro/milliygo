export default function getRankingsAverage(arr: any) {
  const frequency = arr.reduce((acc: any, cur: any) => {
    acc[cur] = (acc[cur] || 0) + 1
    return acc
  }, {})

  const maxNumber = Math.max(...arr)

  const result = Array.from({ length: maxNumber }, (_, i) => ({
    rankingName: i + 1,
    rankings: frequency[i + 1] ? new Array(frequency[i + 1]).fill(i + 1) : [],
  }))

  return result.sort((a, b) => b.rankingName - a.rankingName)
}
