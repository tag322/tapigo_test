<template>
    <div v-if="items !== null" class="main">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="column in Object.keys(items[0])">{{ column }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in items">
                    <td v-for="(cell, index) in row">
                        <template v-if="index === 'done'">
                            <div class="done-cell">
                                {{ cell }}
                                <div class="form-check-inline">
                                    <input class="form-check-input" type="checkbox" :checked="cell === true" @click="toggleDoneVal(rowIndex)"/>
                                    <label class="form-check-label">Отметьте, если задача выполнена</label>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            {{ cell }}
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <button type="button" class="btn btn-secondary" @click="saveChanges">Сохранить изменения</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: null,
        }
    },
    methods: {
        fetchJson() {
            fetch('http://localhost:3000/api/data')
                .then(res => res.json())
                .then(data => {
                    this.items = data;
                });
        },
        saveChanges() {
            fetch('http://localhost:3000/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.items)
            })
                .then(res => res.text())
                .then(msg => alert(msg));
        },
        toggleDoneVal(index) {
            this.items[index]['done'] = !this.items[index]['done']
            console.log(this.items)
        }
    },
    async created() {
        this.fetchJson()
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
    color: #212529;
}

.table th,
.table td {
    max-width: 200px;
    padding: 0.75rem;
    border: 1px solid #dee2e6;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    text-align: center;
}

.done-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
}



/* bootstrap */
.form-check-inline {
  display: inline-flex;
  align-items: center;
}

.form-check-input {
    width: 1em;
    height: 1em;
    margin-top: 0.25em;
    vertical-align: top;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: 1px solid rgba(0, 0, 0, 0.25);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
}

.form-check-input[type="checkbox"]:checked {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
}

.form-check-input[type="radio"]:checked {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
}

.form-check-input:checked {
    background-color: #0d6efd;
    border-color: #0d6efd;
}

.form-check-input:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.form-check-input:disabled {
    filter: none;
    opacity: 0.5;
}

.form-check-label {
    color: rgb(107, 107, 107);

    cursor: pointer;
    margin-bottom: 0;
}

.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, 
              border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  color: #fff;
  background-color: #5c636a;
  border-color: #565e64;
}

.btn:focus, .btn-secondary:focus {
  color: #fff;
  background-color: #5c636a;
  border-color: #565e64;
  box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5);
}

.btn-secondary:active, 
.btn-secondary.active {
  color: #fff;
  background-color: #565e64;
  border-color: #51585e;
}

.btn-secondary:active:focus, 
.btn-secondary.active:focus {
  box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5);
}

.btn-secondary:disabled, 
.btn-secondary.disabled {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
  opacity: 0.65;
}
</style>
