const url = 'https://api.quran.com/api/v4/quran/verses/indopak?chapter_number=1';
const fetch = async () => {
  try { 
    const res = await fetch(url);
    const data = await res.json();
    console.log(data); 
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}
