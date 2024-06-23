import slugify from 'slugify';
import path from 'path';
const slugifyImageName = (originalName) => {
  const timestamp = Date.now().toString().slice(-6);
  const filenameWithoutExt = path.parse(originalName).name;
  const slugifiedFilename = slugify(filenameWithoutExt, { lower: true });
  return `${slugifiedFilename}-${timestamp}${path.extname(originalName)}`;
};

export default slugifyImageName;
