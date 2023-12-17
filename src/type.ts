export const DEFAULT_MAGIC = 0x0000;

export const Flags = {};

export const Type = {
    SPECIAL:    0b000,  //
    RATIONAL:   0b001,  //
    INT:        0b100,  // inline, max 64
    NINT:       0b010,  // inline, max 64
    STRING:     0b011,  // sized, inline
    BYTES:      0b101,  // sized, inline
    LIST:       0b110,  // sized
    MAP:        0b111,  // sized

    NONE:       0b1_0000,  // singleton

    FALSE:      0b1_0001,  // singleton
    TRUE:       0b1_0010,  // singleton

    FLOAT16:    0b1_0011,  // 2 bytes
    FLOAT32:    0b1_0100,  // 4 bytes
    FLOAT64:    0b1_0101,  // 8 bytes
};
