typedef i32 Int
struct StatStruct{
    1:double mean,
    2:Int median,
    3:double variance,
    4:double stddev
}
service CalculateStatisticsService{
    bool ping(),
    StatStruct calculateStat(1: list<Int> input),
    list<Int> generateNums()
}
