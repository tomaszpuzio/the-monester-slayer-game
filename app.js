function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100
        };
    },
    computed: {
        monsterHealthBarStyles() {
            return { width: this.monsterHealth + "%" };
        },
        playerHealthBarStyles() {
            return { width: this.playerHealth + "%" };
        }
    },
    methods: {
        attackMonster() {
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
        }
    },
});

app.mount('#game');