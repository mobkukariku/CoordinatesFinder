import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            X1: "",
            Z1: "",
            A1: "",
            X2: "",
            Z2: "",
            A2: "",
            result: null
        };
        this.handleChangeX1 = this.handleChangeX1.bind(this);
        this.handleChangeZ1 = this.handleChangeZ1.bind(this);
        this.handleChangeA1 = this.handleChangeA1.bind(this);
        this.handleChangeX2 = this.handleChangeX2.bind(this);
        this.handleChangeZ2 = this.handleChangeZ2.bind(this);
        this.handleChangeA2 = this.handleChangeA2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    finalCoor(X1, Z1, A1, X2, Z2, A2) {
        const p = Math.PI / 180;
        let answerX = 0;
        let answerZ = 0;
        if ((X1 !== "" && Z1 !== "" && A1 !== "") && (X2 !== "" && Z2 !== "" && A2 !== "")) {
            const x1 = parseFloat(X1);
            const z1 = parseFloat(Z1);
            const a1 = parseFloat(A1);
            const x2 = parseFloat(X2);
            const z2 = parseFloat(Z2);
            const a2 = parseFloat(A2);

            if (Math.abs(a1 - a2) < 1) {
                return 'The angles cannot be equal.';
            } else if (a1 > 360 || a2 > 360) {
                return 'Angles cannot be greater than 360 degrees.';
            } else {
                function cot(x) {
                    return 1 / Math.tan(x);
                }
                switch (Math.round(a1)) {
                    case -180:
                    case 0:
                    case 180:
                        answerX = Math.round(x1);
                        answerZ = Math.round(cot(-a2 * p) * x1 - (x2 * cot(-a2 * p) - z2));
                        break;
                    case -90:
                    case 90:
                        answerZ = Math.round(z1);
                        answerX = Math.round((x2 * cot(-a2 * p) - z2 + z1) / cot(-a2 * p));
                        break;
                    default:
                        console.log('Damir4ik top))');
                }
                switch (Math.round(a2)) {
                    case -180:
                    case 0:
                    case 180:
                        answerX = Math.round(x2);
                        answerZ = Math.round(cot(-a1 * p) * x2 - (x1 * cot(-a1 * p) - z1));
                        break;
                    case -90:
                    case 90:
                        answerZ = Math.round(z2);
                        answerX = Math.round((x1 * cot(-a1 * p) - z1 + z2) / cot(-a1 * p));
                        break;
                    default:
                        answerX = Math.round(((x1 * cot(-a1 * p) - z1) - (x2 * cot(-a2 * p) - z2)) / (cot(-a1 * p) - cot(-a2 * p)));
                        answerZ = Math.round(cot(-a1 * p) * answerX - (x1 * cot(-a1 * p) - z1));
                }
                return { answerX, answerZ };
            }
        }
        return null;
    }

    handleChangeX1(event) {
        this.setState({ X1: event.target.value });
    }
    handleChangeZ1(event) {
        this.setState({ Z1: event.target.value });
    }
    handleChangeA1(event) {
        this.setState({ A1: event.target.value });
    }
    handleChangeX2(event) {
        this.setState({ X2: event.target.value });
    }
    handleChangeZ2(event) {
        this.setState({ Z2: event.target.value });
    }
    handleChangeA2(event) {
        this.setState({ A2: event.target.value });
    }

    handleSubmit(event) {
        const { X1, Z1, A1, X2, Z2, A2 } = this.state;
        event.preventDefault();
        if (X1.includes("Damir") && X2.includes("Tagankhozhaev")) {
            this.setState({ result: "Timur Gay" });
        } else {
            const result = this.finalCoor(X1, Z1, A1, X2, Z2, A2);
            if (typeof result === 'string' || result==null) {
                this.setState({ result });
            } else {
                const { answerX, answerZ } = result;
                this.setState({ result: `Координаты X=${answerX}, Z=${answerZ}` });
            }
        }
    }

    render() {
        return (
            <div>
                <div className="coordForm">
                    <div className="coordForm_form">
                        <form onSubmit={this.handleSubmit}>
                            <div className="coordForm_content">
                                <h1 className="coordForm_title">1-точка координатов</h1>
                                <div className="coordForm_TextPlaces">
                                    <div className="coordForm_FirstCoords">
                                        <input type="text" placeholder={"X"} value={this.state.X1} onChange={this.handleChangeX1} className="coordForm_TextPlace1" />
                                        <input type="text" placeholder={"Z"} value={this.state.Z1} onChange={this.handleChangeZ1} className="coordForm_TextPlace1" />
                                        <input type="text" placeholder={"A"} value={this.state.A1} onChange={this.handleChangeA1} className="coordForm_TextPlace1" />
                                    </div>
                                    <h1 className="coordForm_title">2-точка координатов</h1>
                                    <div className="coordForm_SecondCoords">
                                        <input type="text" placeholder={"X"} value={this.state.X2} onChange={this.handleChangeX2} className="coordForm_TextPlace2" />
                                        <input type="text" placeholder={"Z"} value={this.state.Z2} onChange={this.handleChangeZ2} className="coordForm_TextPlace2" />
                                        <input type="text" placeholder={"A"} value={this.state.A2} onChange={this.handleChangeA2} className="coordForm_TextPlace2" />
                                    </div>
                                </div>
                                <div className="coordForm_btn"><input type="submit" value="Send" /></div>
                            </div>
                        </form>
                    </div>
                    <div className="coordForm-result">
                            <h2>Результат</h2>
                            <p>{this.state.result}</p>
                        </div>
                </div>
            </div>
        );
    }
}

export default App;
