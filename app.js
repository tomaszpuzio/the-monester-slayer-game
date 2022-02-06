function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            attackRound: 0,
            winner: null,
        };
    },
    computed: {
        monsterHealthBarStyles() {
            return { width: this.monsterHealth + "%" };
        },
        playerHealthBarStyles() {
            return { width: this.playerHealth + "%" };
        },
        disableSpecialAttackButton() {
            return this.attackRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'player'
            }
        }
    },
    methods: {
        startNewGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.attackRound = 0;
            this.winner = null;
        },
        attackMonster() {
            this.attackRound++;
            const attackValue = getRandomValue(5, 12);

            if(this.monsterHealth > 0) {
                this.monsterHealth -= attackValue;
            } else {
                this.monsterHealth = 0;
            }

            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);

            if(this.playerHealth > 0) {
                this.playerHealth -= attackValue;
            } else {
                this.playerHealth = 0;
            }
        },
        specialAttackMonster() {
            this.attackRound++;
            const attackValue = getRandomValue(10, 25);

            if(this.monsterHealth > 0) {
                this.monsterHealth -= attackValue;
            } else {
                this.monsterHealth = 0;
            }

            this.attackPlayer();
        },
        healPlayer() {
            this.attackRound++;
            const healValue = getRandomValue(8, 20);
            
            if (this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }

            this.attackPlayer();
        }
    },
});

app.mount('#game');