module.exports = {
  name: 'saikou-animes',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/saikou-animes',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
