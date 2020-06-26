package com.apm.test.tool;
import android.util.Log;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;

public class ProcessCpuRate {
    private static final String TAG = "ProcessCpuRate";
    private int pid;

    public ProcessCpuRate(int pid) {
        this.pid = pid;
    }

    public double getProcessCpuRate() {

        try {
            java.lang.Process process = Runtime.getRuntime().exec("top");
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line = null;
            String[] info;
            while ((line = bufferedReader.readLine()) != null) {
                if (line.contains(""+pid)) {
                    info = line.replaceAll(" +", " ").split(" ");
                    return new BigDecimal(info[9]).setScale(3, BigDecimal.ROUND_HALF_UP).doubleValue();
                }
            }
        } catch (IOException e) {
            Log.e(TAG, "发生崩溃时记录CPU");
            e.printStackTrace();
        }
        return 0;
    }
}

