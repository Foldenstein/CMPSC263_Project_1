import './ReviewPage.css';

function ReviewPage() {
    const soups = [{name: 'Herbal Soup', img: './picture/herbalsoup.jpg'}, 
        {name: 'Mushroom Soup', img: './picture/mushroomsoup.jpg'}, 
        {name: 'Pork Bone Soup', img: './picture/porkbonesoup.jpg'}, 
        {name: 'Tomato Soup', img: './picture/tomatosoup.jpg'}, 
        {name: 'Tom Yum Soup', img: './picture/tomyumsoup.jpg'}, 
        {name: 'Sichuan Spicy Soup', img: './picture/spicysoup.jpg'}];
    const meats = [{name: 'Beef', img: './picture/beef.jpg'}, 
        {name: 'Lamb', img: './picture/lamb.png'}, 
        {name: 'Chicken', img: './picture/chicken.jpg'}, 
        {name: 'Pork Belly', img: './picture/porkbelly.jpg'}];
    const seafood = [{name: 'Shrimp', img: './picture/shrimp.jpg'}, 
        {name: 'Crabstick', img: './picture/crabstick.jpg'}, 
        {name: 'Squid', img: './picture/squid.jpg'}, 
        {name: 'Blue Live Crab', img: './picture/crab.jpg'}];
    return (
        <div className='menu-page'>
            <h1>Soup Base</h1>
            <p>Important to know what type of soup base to choose from for hot pot. It's what you will cook your food in.</p>
            <div className='menu-soup'>
                {soups.map(soup => (
                    <div className='menu-item'>
                        <img src={soup.img} alt='work in progress'/>
                        <h2>{soup.name}</h2>
                    </div>
                ))}
            </div>
            <h1>Meat Options</h1>
            <p>Thinly sliced for quick cooking. The meat absorb the flavor of the hot pot.</p>
            <div className='menu-meat'>
                {meats.map(meat => (
                    <div className='menu-item'>
                        <img src={meat.img} alt='work in progress'/>
                        <h2>{meat.name}</h2>
                    </div>
                ))}
            </div>
            <h1>Seafood Options</h1>
            <p>Fresh from the market. The seafood cooks quickky and absorb the flavor of the hot pot.</p>
            <div className='menu-seafood'>
                {seafood.map(seafood => (
                    <div className='menu-item'>
                        <img src={seafood.img} alt='work in progress'/>
                        <h2>{seafood.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReviewPage;