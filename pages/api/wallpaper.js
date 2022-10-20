/* @Utils */
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

const wallpaperList = [
  'https://images.unsplash.com/photo-1665334099620-9dc25dd94b67?auto=format&fit=crop&w=2075&q=80',
  'https://images.unsplash.com/photo-1659992271797-c34f19b6f076?auto=format&fit=crop&w=2076&q=80',
  'https://images.unsplash.com/photo-1653131757118-2229a93a7760?auto=format&fit=crop&w=2075&q=80',
  'https://images.unsplash.com/photo-1660080644748-0fe5b278db15?auto=format&fit=crop&w=2075&q=80',
  'https://images.unsplash.com/photo-1660080828092-3734551c59cf?auto=format&fit=crop&w=2075&q=80',
];
const wallpaperListLength = wallpaperList.length;

export default async function handler(req, res) {
  const wallpaper = wallpaperList.at(Math.floor(Math.random() * wallpaperListLength));

  await wait(3000);

  if (Math.random() < 0.5) {
    res.status(500).json({ error: 'ohhhhhh, year. This is backend problem 🪺' });

    return;
  }

  res.status(200).json({ wallpaper });
}
