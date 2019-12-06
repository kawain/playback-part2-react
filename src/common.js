class FBTone {
    constructor(note, octave) {
        this.note = note;
        this.octave = octave;
        this.fill = "blue";
        this.display = "none";
    }
}

export const Fingerboard = [
    [new FBTone("F", 4), new FBTone("Gb", 4), new FBTone("G", 4), new FBTone("Ab", 4), new FBTone("A", 4), new FBTone("Bb", 4), new FBTone("B", 4), new FBTone("C", 5), new FBTone("Db", 5), new FBTone("D", 5), new FBTone("Eb", 5), new FBTone("E", 5), new FBTone("F", 5), new FBTone("Gb", 5), new FBTone("G", 5), new FBTone("Ab", 5), new FBTone("A", 5), new FBTone("Bb", 5), new FBTone("B", 5), new FBTone("C", 6)],
    [new FBTone("C", 4), new FBTone("Db", 4), new FBTone("D", 4), new FBTone("Eb", 4), new FBTone("E", 4), new FBTone("F", 4), new FBTone("Gb", 4), new FBTone("G", 4), new FBTone("Ab", 4), new FBTone("A", 4), new FBTone("Bb", 4), new FBTone("B", 4), new FBTone("C", 5), new FBTone("Db", 5), new FBTone("D", 5), new FBTone("Eb", 5), new FBTone("E", 5), new FBTone("F", 5), new FBTone("Gb", 5), new FBTone("G", 5)],
    [new FBTone("Ab", 3), new FBTone("A", 3), new FBTone("Bb", 3), new FBTone("B", 3), new FBTone("C", 4), new FBTone("Db", 4), new FBTone("D", 4), new FBTone("Eb", 4), new FBTone("E", 4), new FBTone("F", 4), new FBTone("Gb", 4), new FBTone("G", 4), new FBTone("Ab", 4), new FBTone("A", 4), new FBTone("Bb", 4), new FBTone("B", 4), new FBTone("C", 5), new FBTone("Db", 5), new FBTone("D", 5), new FBTone("Eb", 5)],
    [new FBTone("Eb", 3), new FBTone("E", 3), new FBTone("F", 3), new FBTone("Gb", 3), new FBTone("G", 3), new FBTone("Ab", 3), new FBTone("A", 3), new FBTone("Bb", 3), new FBTone("B", 3), new FBTone("C", 4), new FBTone("Db", 4), new FBTone("D", 4), new FBTone("Eb", 4), new FBTone("E", 4), new FBTone("F", 4), new FBTone("Gb", 4), new FBTone("G", 4), new FBTone("Ab", 4), new FBTone("A", 4), new FBTone("Bb", 4)],
    [new FBTone("Bb", 2), new FBTone("B", 2), new FBTone("C", 3), new FBTone("Db", 3), new FBTone("D", 3), new FBTone("Eb", 3), new FBTone("E", 3), new FBTone("F", 3), new FBTone("Gb", 3), new FBTone("G", 3), new FBTone("Ab", 3), new FBTone("A", 3), new FBTone("Bb", 3), new FBTone("B", 3), new FBTone("C", 4), new FBTone("Db", 4), new FBTone("D", 4), new FBTone("Eb", 4), new FBTone("E", 4), new FBTone("F", 4)],
    [new FBTone("F", 2), new FBTone("Gb", 2), new FBTone("G", 2), new FBTone("Ab", 2), new FBTone("A", 2), new FBTone("Bb", 2), new FBTone("B", 2), new FBTone("C", 3), new FBTone("Db", 3), new FBTone("D", 3), new FBTone("Eb", 3), new FBTone("E", 3), new FBTone("F", 3), new FBTone("Gb", 3), new FBTone("G", 3), new FBTone("Ab", 3), new FBTone("A", 3), new FBTone("Bb", 3), new FBTone("B", 3), new FBTone("C", 4)]
]

export function RefreshDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let n = 0; n < arr[i].length; n++) {
            arr[i][n].display = "none";
        }
    }
}

//スケール移調用
const keyArray = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]

//スケール移調関数 keyArray を並べ替える（例：引数に10 ->Aを入れれば　[ "A", "Bb", "B", "C", "Db", "D", "Eb",・・・）
export function transposition(n) {
    let n2 = Number(n) - 1
    let i = 0
    const a1 = []
    const a2 = []

    for (const v of keyArray) {
        if (i >= n2) {
            a1.push(v)
        } else {
            a2.push(v)
        }
        i++
    }

    return a1.concat(a2)
}

const frequency = {
    "C2": 65.406,
    "C#2": 69.296,
    "Db2": 69.296,
    "D2": 73.416,
    "D#2": 77.782,
    "Eb2": 77.782,
    "E2": 82.407,
    "F2": 87.307,
    "F#2": 92.499,
    "Gb2": 92.499,
    "G2": 97.999,
    "G#2": 103.826,
    "Ab2": 103.826,
    "A2": 110,
    "A#2": 116.541,
    "Bb2": 116.541,
    "B2": 123.471,
    "C3": 130.813,
    "C#3": 138.591,
    "Db3": 138.591,
    "D3": 146.832,
    "D#3": 155.563,
    "Eb3": 155.563,
    "E3": 164.814,
    "F3": 174.614,
    "F#3": 184.997,
    "Gb3": 184.997,
    "G3": 195.998,
    "G#3": 207.652,
    "Ab3": 207.652,
    "A3": 220,
    "A#3": 233.082,
    "Bb3": 233.082,
    "B3": 246.942,
    "C4": 261.626,
    "C#4": 277.183,
    "Db4": 277.183,
    "D4": 293.665,
    "D#4": 311.127,
    "Eb4": 311.127,
    "E4": 329.628,
    "F4": 349.228,
    "F#4": 369.994,
    "Gb4": 369.994,
    "G4": 391.995,
    "G#4": 415.305,
    "Ab4": 415.305,
    "A4": 440,
    "A#4": 466.164,
    "Bb4": 466.164,
    "B4": 493.883,
    "C5": 523.251,
    "C#5": 554.365,
    "Db5": 554.365,
    "D5": 587.33,
    "D#5": 622.254,
    "Eb5": 622.254,
    "E5": 659.255,
    "F5": 698.456,
    "F#5": 739.989,
    "Gb5": 739.989,
    "G5": 783.991,
    "G#5": 830.609,
    "Ab5": 830.609,
    "A5": 880,
    "A#5": 932.328,
    "Bb5": 932.328,
    "B5": 987.767,
    "C6": 1046.502
}

const defNote = "C4"

export const soundFiles = {
    "guitar": "./sound/Guitar-C4.wav",
    "hihat": "./sound/hihat.wav",
    "snare": "./sound/snare.wav",
    "kick": "./sound/kick.wav"
}

export function calcFrequency(note) {
    return frequency[note] / frequency[defNote]
}

export async function loadFile(context, filePath) {
    const response = await fetch(filePath)
    const arraybuf = await response.arrayBuffer()
    const buf = await context.decodeAudioData(arraybuf)
    return buf
}
