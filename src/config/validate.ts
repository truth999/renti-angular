export const Validate = {
  firstName: '[\\p{L}]{2,15}',
  lastName: '[\\p{L}]{2,15}',
  nameOfSchool: '[\\p{L} -]{2,35}',
  jobTitle: '[\\p{L} -]{2,35}',
  universitySpeciality: '[[\\p{L} -]{2,35}',
  currentWorkplace: '[\\p{L} -]{2,35}',
  formerWorkplaces: '[\\p{L} -]{2,35}',
  otherText: '[\\p{L} -0-9,.!:"\']+{1-99}',
  freeTextIntroduction: '[\\p{L} -0-9,.!:"\']+{1-99}',
  roomName: '[\\p{L}0-9- ]{2-50}',
  furnitureName: '[\\p{L} -]{2,100}',
  furnitureType: '[\\p{L}0-9- ]+{1-50}',
  movingWith: '[\\p{L}-0-9 ]{2-15}',
  whyChooseMe: '[\\p{L}0-9-,.! "\':;)(]{5-999]'
};
