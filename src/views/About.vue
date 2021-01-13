<template>
  <div class="container about my-container">
        <h1>Gladiators - The Game</h1>
        <h2>Now available for Browsers</h2>

        <p class="ma-4">
        Gladiators is a turn-based strategy game for 2 Players.
        Players can buy different Gladiators (such as Knights, Archer or Tanks) 
        for a certain amount of money (credits). One way to earn money is to attack 
        the gold mine that is randomly positioned on the board. Another way to get money
        is to kill Gladiators of your opponent.
        Gladiators have various attributes that specify their skills.
        
        </p>
        The attributes are:
        <ul>
            <li>Movement Points (the amount of tiles a Gladiator can walk per turn)</li>
            <li>Health Points (the damage a Gladiator can take until he dies)</li>
            <li>Attack Points (the damage a Gladiator does per attack)</li>
        </ul>
        <p class="ma-4">
        The shop generates random gladiators and provides them to the players.
        Each Gladiator-type has a intervals of possible values for each attribute.
        </p>
        <table>
        <tr>
            <th>Gladiator-Type</th>
            <th>Movement-Points</th>
            <th>Health-Points</th>
            <th>Attack-Points</th>
        </tr>
        <tr>
            <th>Knight</th>
            <th>3 - 4</th>
            <th>50 - 80</th>
            <th>50 - 80</th>
        </tr>
        <tr>
            <th>Archer</th>
            <th>2 - 3</th>
            <th>30 - 50</th>
            <th>40 - 70</th>
        </tr>
        <tr>
            <th>Tank</th>
            <th>1 - 2</th>
            <th>80 - 100</th>
            <th>30 - 50</th>
        </tr>
        
        </table>
        <p class="ma-4">
        The goal of the game is to destroy the enemy's base by attacking it.
        At the start of the game each base has 200 Health-Points.
        </p>
    </div>
</template>
<style scoped>
table {
    margin: auto;
    border-spacing: 50px 0;
}    
td {
    padding: 10px 0;
}
th {
    font-weight: normal;
}
</style>