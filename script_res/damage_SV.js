/* Damage calculation for the Generation IX games: Scarlet and Violet;
 * for the Generation VIII games: Sword, Shield, Brilliant Diamond, and Shining Pearl;
 * and for the Generation VII games: Sun, Moon, Ultra Sun, and Ultra Moon */

function CALCULATE_ALL_MOVES_SV(p1, p2, field) {
    checkTrace(p1, p2);
    checkTrace(p2, p1);
    checkNeutralGas(p1, p2, field.getNeutralGas());
    checkAirLock(p1, field);
    checkAirLock(p2, field);
    checkForecast(p1, field.getWeather());
    checkForecast(p2, field.getWeather());
    checkMimicry(p1, field.getTerrain());
    checkMimicry(p2, field.getTerrain());
    checkTerastal(p1);
    checkTerastal(p2);
    checkKlutz(p1);
    checkKlutz(p2);
    checkEvo(p1, p2);
    checkParadoxAbilities(p1, field.getTerrain(), field.getWeather());
    checkParadoxAbilities(p2, field.getTerrain(), field.getWeather());
    checkSeeds(p1, field.getTerrain());
    checkSeeds(p2, field.getTerrain());
    checkSwordShield(p1);
    checkSwordShield(p2);
    checkWindRider(p1, field.getTailwind(0));
    checkWindRider(p2, field.getTailwind(1));
    checkIntimidate(p1, p2);
    checkIntimidate(p2, p1);
    checkSupersweetSyrup(p1, p2);
    checkSupersweetSyrup(p2, p1);
    checkDownload(p1, p2);
    checkDownload(p2, p1);
    checkEmbodyAspect(p1);
    checkEmbodyAspect(p2);
    checkBattleBond(p1);
    checkBattleBond(p2);
    p1.stats[AT] = getModifiedStat(p1.rawStats[AT], p1.boosts[AT]); //new order is important for the proper Protosynthesis/Quark Drive boost
    p1.stats[DF] = getModifiedStat(p1.rawStats[DF], p1.boosts[DF]);
    p1.stats[SA] = getModifiedStat(p1.rawStats[SA], p1.boosts[SA]);
    p1.stats[SD] = getModifiedStat(p1.rawStats[SD], p1.boosts[SD]);
    p1.stats[SP] = getModifiedStat(p1.rawStats[SP], p1.boosts[SP]);
    setHighestStat(p1, 0);
    p1.stats[SP] = getFinalSpeed(p1, field.getWeather(), field.getTailwind(0), field.getSwamp(0), field.getTerrain());
    $(".p1-speed-mods").text(p1.stats[SP]);
    p2.stats[AT] = getModifiedStat(p2.rawStats[AT], p2.boosts[AT]);
    p2.stats[DF] = getModifiedStat(p2.rawStats[DF], p2.boosts[DF]);
    p2.stats[SA] = getModifiedStat(p2.rawStats[SA], p2.boosts[SA]);
    p2.stats[SD] = getModifiedStat(p2.rawStats[SD], p2.boosts[SD]);
    p2.stats[SP] = getModifiedStat(p2.rawStats[SP], p2.boosts[SP]);
    setHighestStat(p2, 1);
    p2.stats[SP] = getFinalSpeed(p2, field.getWeather(), field.getTailwind(1), field.getSwamp(1), field.getTerrain());
    $(".p2-speed-mods").text(p2.stats[SP]);
    var side1 = field.getSide(1);
    var side2 = field.getSide(0);
    checkInfiltrator(p1, side1);
    checkInfiltrator(p2, side2);
    getWeightMods(p1, p2);
    var results = [[],[]];
    for (var i = 0; i < 4; i++) {
        results[0][i] = GET_DAMAGE_SV(p1, p2, p1.moves[i], side1);
        results[1][i] = GET_DAMAGE_SV(p2, p1, p2.moves[i], side2);
    }
    return results;
}

function CALCULATE_ALL_MOVES_WITHOUT_ABILITIES_SV(p1, p2, field) {
    // TODO(tblock007) - determine whether we want to incorporate these abilities in some way
    // checkTerastal(p1);
    // checkTerastal(p2);

    // checkParadoxAbilities(p1, field.getTerrain(), field.getWeather());
    // checkParadoxAbilities(p2, field.getTerrain(), field.getWeather());

    // checkSeeds(p1, field.getTerrain());
    // checkSeeds(p2, field.getTerrain());

    // checkSwordShield(p1);
    // checkSwordShield(p2);

    p1.stats[AT] = getModifiedStat(p1.rawStats[AT], p1.boosts[AT]); //new order is important for the proper Protosynthesis/Quark Drive boost
    p1.stats[DF] = getModifiedStat(p1.rawStats[DF], p1.boosts[DF]);
    p1.stats[SA] = getModifiedStat(p1.rawStats[SA], p1.boosts[SA]);
    p1.stats[SD] = getModifiedStat(p1.rawStats[SD], p1.boosts[SD]);
    p1.stats[SP] = getModifiedStat(p1.rawStats[SP], p1.boosts[SP]);
    setHighestStat(p1, 0);
    p1.stats[SP] = getFinalSpeed(p1, field.getWeather(), field.getTailwind(0), field.getSwamp(0), field.getTerrain());
    $(".p1-speed-mods").text(p1.stats[SP]);
    p2.stats[AT] = getModifiedStat(p2.rawStats[AT], p2.boosts[AT]);
    p2.stats[DF] = getModifiedStat(p2.rawStats[DF], p2.boosts[DF]);
    p2.stats[SA] = getModifiedStat(p2.rawStats[SA], p2.boosts[SA]);
    p2.stats[SD] = getModifiedStat(p2.rawStats[SD], p2.boosts[SD]);
    p2.stats[SP] = getModifiedStat(p2.rawStats[SP], p2.boosts[SP]);
    setHighestStat(p2, 1);
    p2.stats[SP] = getFinalSpeed(p2, field.getWeather(), field.getTailwind(1), field.getSwamp(1), field.getTerrain());
    $(".p2-speed-mods").text(p2.stats[SP]);
    var side1 = field.getSide(1);
    var side2 = field.getSide(0);
    getWeightMods(p1, p2);
    var results = [[],[]];
    for (var i = 0; i < 4; i++) {
        results[0][i] = GET_DAMAGE_SV(p1, p2, p1.moves[i], side1);
        results[1][i] = GET_DAMAGE_SV(p2, p1, p2.moves[i], side2);
    }
    return results;
}

function GET_DAMAGE_SV(attacker, defender, move, field) {
    var moveDescName = move.name;
    var isQuarteredByProtect = false, isMeFirst = false;

    var attIsGrounded = pIsGrounded(attacker, field);
    var defIsGrounded = pIsGrounded(defender, field);

    if (move.name == 'Me First')
        [move, moveDescName, isMeFirst] = checkMeFirst(move, moveDescName, attacker.isDynamax);

    checkMoveTypeChange(move, field, attacker);
    checkConditionalPriority(move, field.terrain, attacker, attIsGrounded);
    checkConditionalSpread(move, field.terrain, attacker, attIsGrounded);

    if (attacker.isDynamax && gen === 8)    //without the gen check a Dynamaxed Pokemon can lead to an error switching between gen 8 and either 7 or 9
        [move, isQuarteredByProtect, moveDescName] = MaxMoves(move, attacker, isQuarteredByProtect, moveDescName, field);
    else if (move.name == "Nature Power" && attacker.item !== 'Assault Vest')
        [move, moveDescName] = NaturePower(move, field, moveDescName);

    if (move.isZ || move.isSignatureZ)
        [move, isQuarteredByProtect, moveDescName] = ZMoves(move, field, attacker, isQuarteredByProtect, moveDescName);

    //Needs to be after the Z-move check since Light That Burns The Sky can change category
    if (usesPhysicalAttack(attacker, defender, move)) {
        move.category = "Physical";
    }

    //Placed here so 1) Me First moves get contact, and 2) physical Shell Side Arm gets contact
    checkContactOverride(move, attacker);

    attacker_name = attacker.name;
    if (attacker_name && attacker_name.includes("-Gmax")) attacker_name = attacker_name.substring(0, attacker_name.indexOf('-Gmax'));
    defender_name = defender.name;
    if (defender_name && defender_name.includes("-Gmax")) defender_name = defender_name.substring(0, defender_name.indexOf('-Gmax'));

    var description = {
        "attackerName": attacker_name,
        "moveName": moveDescName,
        "defenderName": defender_name
    };

    addLevelDesc(attacker, defender, description);

    if (move.bp === 0 || move.category === "Status") {
        return statusMoves(move, attacker, defender, description);
    }

    description.attackerTera = attacker.isTerastalize ? attacker.tera_type : false;
    description.defenderTera = defender.isTerastalize ? defender.tera_type : false;

    var defAbility = defender.ability;
    [defAbility, description] = abilityIgnore(attacker, move, defAbility, description, defender.item);

    var isCritical = critMove(move, defAbility);

    var ateIzeAbility = ATE_IZE_ABILITIES.indexOf(attacker.ability);    //Confirms abilities like Normalize and Pixilate but not Liquid Voice
    var ateIzeBoosted;
    if (!move.isZ && (ateIzeAbility !== -1 || attacker.ability == "Liquid Voice")
        && ['Hidden Power', 'Weather Ball', 'Natural Gift', 'Judgement', 'Techno Blast', 'Revelation Dance', 'Multi-Attack', 'Terrain Pulse'].indexOf(move.name) === -1) {
        [move, description, ateIzeBoosted] = ateIzeTypeChange(move, attacker, description);
    }

    var typeEffect1 = getMoveEffectiveness(move, defender.type1, defender.type2, description, field.isForesight, ["Scrappy", "Mind's Eye"].indexOf(attacker.ability) != -1 ? attacker.ability : false, field.isGravity, defender.item, field.weather === "Strong Winds", defender.isTerastalize);
    var typeEffect2 = defender.type2 && defender.type2 !== defender.type1 && move.type !== 'Stellar' ? getMoveEffectiveness(move, defender.type2, defender.type1, description, field.isForesight, ["Scrappy", "Mind's Eye"].indexOf(attacker.ability) != -1 ? attacker.ability : false, field.isGravity, defender.item, field.weather === "Strong Winds", defender.isTerastalize) : 1;
    var typeEffectiveness = typeEffect1 * typeEffect2;
    immuneBuildDesc = immunityChecks(move, attacker, defender, field, description, defAbility, typeEffectiveness);
    if (immuneBuildDesc !== -1) return immuneBuildDesc;
    typeEffectiveness = checkTeraShell(defAbility === 'Tera Shell' && defender.curHP === defender.maxHP, description, typeEffectiveness);

    getHPInfo(description, defender);

    setDamageBuildDesc = setDamage(move, attacker, defender, description, isQuarteredByProtect, field);
    if (setDamageBuildDesc !== -1) return setDamageBuildDesc;

    if (move.hitRange) {
        description.hits = move.hits;
    }
    var turnOrder = attacker.stats[SP] > defender.stats[SP] ? "FIRST" : "LAST";

    ////////////////////////////////
    ////////// BASE POWER //////////
    ////////////////////////////////
    var basePower;
    [basePower, description] = basePowerFunc(move, description, turnOrder, attacker, defender, field, attIsGrounded, defIsGrounded, defAbility);

    var bpMods;
    [bpMods, description, move] = calcBPMods(attacker, defender, field, move, description, ateIzeBoosted, basePower, attIsGrounded, defIsGrounded, turnOrder, defAbility, isMeFirst);

    basePower = Math.max(1, pokeRound(basePower * chainMods(bpMods) / 0x1000));

    ////////////////////////////////
    ////////// (SP)ATTACK //////////
    ////////////////////////////////

    var attack;
    [attack, description] = calcAttack(move, attacker, defender, description, isCritical, defAbility);

    var atMods;
    [atMods, description] = calcAtMods(move, attacker, defAbility, description, field);

    attack = Math.max(1, pokeRound(attack * chainMods(atMods) / 0x1000));

    ////////////////////////////////
    ///////// (SP)DEFENSE //////////
    ////////////////////////////////
    var hitsPhysical = move.category === "Physical" || move.dealsPhysicalDamage;

    var defense;
    [defense, description] = calcDefense(move, attacker, defender, description, hitsPhysical, isCritical, field);

    var dfMods;
    [dfMods, description] = calcDefMods(move, defender, field, description, hitsPhysical, defAbility);

    defense = Math.max(1, pokeRound(defense * chainMods(dfMods) / 0x1000));

    ////////////////////////////////
    //////////// DAMAGE ////////////
    ////////////////////////////////
    var baseDamage = calcBaseDamage(attacker, basePower, attack, defense);


    return calcGeneralMods(baseDamage, move, attacker, defender, defAbility, field, description, isCritical, typeEffectiveness, isQuarteredByProtect, hitsPhysical);
}
