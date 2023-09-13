module.exports = {
    preset: 'ts-jest',
    roots: ['<rootDir>/dist/'],
    collectCoverage: true,
    coverageReporters: ["html", "text"]
  };