<script>
     import FaIcon from "./FaIcon.svelte";
</script>

<div class="table">
    <div class="row">
        <h2>STR</h2>
        <h2>DEX</h2>
        <h2>CON</h2>
        <h2>INT</h2>
        <h2>WIS</h2>
        <h2>CHA</h2>
    </div>
    <div class="row value">
        <h2>9</h2>
        <h2>13</h2>
        <h2>14</h2>
        <h2>20</h2>
        <h2>14</h2>
        <h2>12</h2>
    </div>
    <hr/>
    <div class="attribute-grid">
        <div>
            <div>race: Forest Gnome</div>
            <div>age: 342</div>
            <div>alignment: Chaotic</div>
        </div>
        <div class="hp">
            <FaIcon icon="heart"/>
            <div class="hp-value">
                62
            </div>
        </div>
    </div>
</div>

<style>
    hr {
        color: var(--highlight);
    }

    .row {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
    }

    .row h2 {
        margin: auto;
    }

    .row.value h2 {
        color: var(--primary);
    }

    .hp {
        color: red;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid red;
        font-size: 72px;
    }

    .hp-value {
        color: var(--white);
        position: absolute;
        font-size: 32px;
        font-weight: bold;
        font-family: Vecna;
    }

    .attribute-grid {
        display: grid;
        grid-template-columns: 1fr auto;
    }
</style>