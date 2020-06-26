package com.apm.test.tool;

import android.app.Fragment;
import android.os.Bundle;

import com.apm.model.FragmentInfo;
import com.apm.service.collect.FragmentCollector;
import com.apm.util.BaseInfoUtil;
import com.apm.util.Config;
import com.apm.util.ContextHolder;
import com.apm.util.Converter;
import com.apm.util.SendDataUtil;

import java.util.HashMap;

/**
 * Created by JJY on 2016/3/25.
 */
public class APMFragment extends Fragment {
    static protected HashMap<String, Boolean> APMFragMap = new HashMap<String, Boolean>();

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        System.out.println("Config.activityColection==" + Config.activityColection);
        if (!Config.activityColection)
            return;
        else {
            if (this == null) {
                throw new IllegalArgumentException("fragment is null");
            }
            APMFragMap.put(this.getClass().getName(), true);
            FragmentInfo fragmentInfo = BaseInfoUtil.getInstance(ContextHolder.context).getFragmentInfo();
            fragmentInfo.setBeforeCreate(System.currentTimeMillis());
            android.app.Fragment fragment = this;
            fragmentInfo.setName(fragment.getClass().getName());
            // 设置Fragment所在的Activity所在的名字
            fragmentInfo.setWraper(fragment.getActivity().getClass().getName());
            fragmentInfo.setBeforeCreate(System.currentTimeMillis());
            FragmentCollector.setCurrent(fragmentInfo);
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        if (!Config.activityColection)
            return;
        else {
            if (APMFragMap.get(this.getClass().getName()) == true) {
                FragmentInfo fragmentInfo = FragmentCollector.getCurrent();
                fragmentInfo.setAfterCreate(System.currentTimeMillis());
                SendDataUtil.SendData(Converter.getJson(fragmentInfo), 2);
                //            FragmentCollector.put(fragmentInfo);
            }
        }
    }

    @Override
    public void onPause() {
        super.onPause();
        if (!Config.activityColection)
            return;
        else
            APMFragMap.put(this.getClass().getName(), false);
    }
}
