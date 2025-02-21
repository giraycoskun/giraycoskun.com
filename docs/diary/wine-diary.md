 <style>
    .wine-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-width: 800px;
        margin: 0 auto;
    }

    .wine-entry {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .wine-entry img {
        width: 150px;
        height: auto;
        border-radius: 8px;
    }

    .wine-entry.left {
        flex-direction: row;
    }

    .wine-entry.right {
        flex-direction: row-reverse;
    }

    .location {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.9em;
            color: #555;
        }

    .location img {
        width: 16px;
        height: 16px;
    }

    #map { height: 720px; }

</style>

![wine](/assets/img/wine.png){ width="150" }
#  Wine Diary


 <main>


        <section id="wines" class="wine-container">
            <div class="wine-entry right">
                <img src="/assets/img/wine.png" alt="Wine 1">
                <p>A delightful red wine with rich berry flavors.</p>
            </div>
            <div class="wine-entry left">
                <img src="/assets/img/wine.png" alt="Wine 2">
                <p>A crisp white wine with hints of citrus and floral notes.</p>
            </div>
            <div class="wine-entry right">
                <img src="/assets/img/wine.png" alt="Wine 3">
                <div class="wine-text">
                    <p>A refreshing rosé with subtle strawberry and peach aromas.</p>
                    <div class="location">
                        <img src="location-icon.png" alt="Location"> Provence, France
                    </div>
                </div>
            </div>
            <div class="wine-entry left">
                <img src="/assets/img/wine.png" alt="Wine 4">
                <div class="wine-text">
                    <p>A refreshing rosé with subtle strawberry and peach aromas.</p>
                    <div class="location">
                        <img src="location-icon.png" alt="Location"> Provence, France
                    </div>
                </div>
            </div>
        </section>
        <section id="map-container">
            <h2>Wine Origins</h2>
            <div id="map"></div>
        </section>
    </main>